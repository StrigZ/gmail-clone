import { relations, sql } from 'drizzle-orm';
import {
  index,
  integer,
  json,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { type AdapterAccount } from 'next-auth/adapters';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `gmail-clone_${name}`);

export const emailStatusEnum = pgEnum('email_status', ['sent', 'draft']);

export const emails = createTable(
  'email',
  {
    id: varchar('id', { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    createdById: varchar('created_by', { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
    title: varchar('title', { length: 256 }),
    recipient: varchar('recipient', { length: 256 }),
    subject: varchar('subject', { length: 256 }),
    body: json('body'),
    status: emailStatusEnum('status').default('draft'),
  },
  (t) => ({
    createdByIdIdx: index('created_by_idx').on(t.createdById),
  }),
);

export const emailsRelations = relations(emails, ({ many, one }) => ({
  user: one(users, { fields: [emails.createdById], references: [users.id] }),
  labels: many(emailToLabel),
  starredBy: many(starredEmailToUser),
}));

export const labels = createTable('label', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp('created_at', { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  title: varchar('title', { length: 256 }).notNull(),
});

export const labelsRelations = relations(labels, ({ many }) => ({
  emails: many(emailToLabel),
}));

export const emailToLabel = createTable(
  'email_to_label',
  {
    emailId: varchar('email_id')
      .references(() => emails.id)
      .notNull(),
    labelId: varchar('label_id')
      .references(() => labels.id)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.emailId, t.labelId] }),
  }),
);

export const emailToLabelRelations = relations(emailToLabel, ({ one }) => ({
  label: one(labels, {
    fields: [emailToLabel.labelId],
    references: [labels.id],
  }),
  email: one(emails, {
    fields: [emailToLabel.emailId],
    references: [emails.id],
  }),
}));

export const starredEmailToUser = createTable(
  'starred_email_to_user',
  {
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    emailId: varchar('email_id')
      .references(() => emails.id)
      .notNull(),
    userId: varchar('user_id')
      .references(() => users.id)
      .notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.emailId, t.userId] }),
  }),
);

export const starredEmailToUserRelations = relations(
  starredEmailToUser,
  ({ one }) => ({
    user: one(users, {
      fields: [starredEmailToUser.userId],
      references: [users.id],
    }),
    email: one(emails, {
      fields: [starredEmailToUser.emailId],
      references: [emails.id],
    }),
  }),
);

export const users = createTable('user', {
  id: varchar('id', { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: timestamp('email_verified', {
    mode: 'date',
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar('image', { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  emails: many(emails),
  starredEmails: many(starredEmailToUser),
}));

export const accounts = createTable(
  'account',
  {
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', {
      length: 255,
    }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: varchar('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: varchar('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index('account_user_id_idx').on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  'session',
  {
    sessionToken: varchar('session_token', { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar('user_id', { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp('expires', {
      mode: 'date',
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index('session_user_id_idx').on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  'verification_token',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull(),
    expires: timestamp('expires', {
      mode: 'date',
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
