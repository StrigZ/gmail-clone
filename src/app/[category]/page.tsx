import EmailList from '~/components/EmailList';
import { auth } from '~/server/auth';
import { api } from '~/trpc/server';

export default async function Home({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const session = await auth();
  const { category } = await params;

  void api.emails.emails.prefetchInfinite({});

  if (session?.user) {
    void api.emails.userEmails.prefetchInfinite({});
  }

  return <EmailList className="flex-1" />;
}
