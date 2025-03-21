import { auth } from '~/server/auth';
import { api } from '~/trpc/server';

export default async function Home() {
  const session = await auth();

  void api.emails.emails.prefetchInfinite({});

  if (session?.user) {
    void api.emails.userEmails.prefetchInfinite({});
  }

  return null;
}
