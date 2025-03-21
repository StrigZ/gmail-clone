import { Settings } from 'lucide-react';

import { auth } from '~/server/auth';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import SearchBar from './SearchBar';

type Props = {};
export default async function Header({}: Props) {
  const session = await auth();

  return (
    <header className="flex items-center gap-2">
      <SearchBar className="max-w-2xl flex-1" />

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings />
        </Button>

        {session && (
          <Avatar className="">
            {session?.user.image && <AvatarImage src={session?.user.image} />}
            <AvatarFallback>
              {session?.user.name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </header>
  );
}
