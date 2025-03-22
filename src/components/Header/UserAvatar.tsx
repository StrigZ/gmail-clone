import { auth } from '~/server/auth';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default async function UserAvatar() {
  const session = await auth();

  return (
    <Avatar>
      {session?.user.image && <AvatarImage src={session?.user.image} />}
      <AvatarFallback>{session?.user.name?.[0]?.toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
