import type { inferProcedureBuilderResolverOptions } from '@trpc/server';
import { type SQLWrapper, and, asc, eq, isTable } from 'drizzle-orm';
import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc';
import { emails, starredEmailToUser, users } from '~/server/db/schema';

const getEmails = async ({
  ctx,
  input,
  additionalFilters = [],
}: {
  ctx: inferProcedureBuilderResolverOptions<typeof publicProcedure>['ctx'];
  input: {
    startsWith?: string;
    limit: number;
    cursor?: number | null;
    status?: 'sent' | 'draft';
  };
  additionalFilters?: (SQLWrapper | undefined)[];
}) => {
  const emailItems = await ctx.db.query.emails.findMany({
    where: ({ id, title }, { eq, ilike, and }) =>
      and(
        input.cursor ? eq(id, String(input.cursor)) : undefined,
        input.startsWith ? ilike(title, input.startsWith) : undefined,
        ...additionalFilters,
      ),

    orderBy: (emails, { asc }) => asc(emails.id),
    limit: input.limit + 1,
    columns: {
      id: true,
      title: true,
      subject: true,
    },
  });

  let nextCursor: typeof input.cursor | undefined = undefined;
  if (emailItems.length > input.limit) {
    const nextItem = emailItems.pop();
    nextCursor = Number(nextItem!.id);
  }

  return {
    emails: emailItems,
    nextCursor,
  };
};

export const emailRouter = createTRPCRouter({
  email: publicProcedure
    .input(z.object({ id: z.string().nonempty() }))
    .query(async ({ input, ctx }) =>
      ctx.db.query.emails.findFirst({
        where: ({ id }, { eq }) => eq(id, input.id),
      }),
    ),
  emails: publicProcedure
    .input(
      z.object({
        startsWith: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input, ctx }) => getEmails({ ctx, input })),
  userEmails: protectedProcedure
    .input(
      z.object({
        startsWith: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.number().nullish(),
        status: z.enum(['sent', 'draft']).optional(),
      }),
    )
    .query(async ({ input, ctx }) =>
      getEmails({
        ctx,
        input,
        additionalFilters: [
          input.status ? eq(emails.status, input.status) : undefined,
          eq(emails.createdById, ctx.session.user.id),
        ],
      }),
    ),
  userStarredEmails: protectedProcedure
    .input(
      z.object({
        startsWith: z.string().optional(),
        limit: z.number().min(1).max(100).default(50),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const emailItems = await ctx.db
        .select()
        .from(starredEmailToUser)
        .rightJoin(emails, eq(emails.id, starredEmailToUser.emailId))
        .where(
          and(
            eq(starredEmailToUser.userId, ctx.session.user.id),
            input.cursor
              ? eq(starredEmailToUser.emailId, String(input.cursor))
              : undefined,
          ),
        )
        .orderBy(asc(starredEmailToUser.createdAt))
        .limit(input.limit + 1);

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (emailItems.length > input.limit) {
        const nextItem = emailItems.pop();
        nextCursor = Number(nextItem!.email?.id);
      }

      return {
        emails: emailItems,
        nextCursor,
      };
    }),

  createEmail: protectedProcedure.mutation(async ({ ctx }) => {
    ctx.db.insert(emails).values({
      createdById: ctx.session.user.id,
      status: 'draft',
    });
  }),
  updateEmail: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
        title: z.string().max(100).nonempty(),
        subject: z.string().max(100).nullish(),
        recipient: z.string().email().nonempty(),
        body: z.string().nonempty(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.db
        .update(emails)
        .set({
          title: input.title,
          subject: input.subject,
          recipient: input.recipient,
          body: input.body,
        })
        .where(eq(emails.id, input.id)),
    ),
  sendEmail: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      }),
    )
    .mutation(async ({ ctx, input }) =>
      ctx.db
        .update(emails)
        .set({
          status: 'sent',
        })
        .where(eq(emails.id, input.id)),
    ),
  starEmail: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const isStarred = await ctx.db.query.starredEmailToUser.findFirst({
        where: ({ emailId, userId }, { and, eq }) =>
          and(eq(emailId, input.id), eq(userId, ctx.session.user.id)),
      });
      if (isStarred) {
        return ctx.db
          .delete(starredEmailToUser)
          .where(
            and(
              eq(starredEmailToUser.emailId, input.id),
              eq(starredEmailToUser.userId, ctx.session.user.id),
            ),
          );
      }
      return ctx.db
        .insert(starredEmailToUser)
        .values({ emailId: input.id, userId: ctx.session.user.id });
    }),
});
