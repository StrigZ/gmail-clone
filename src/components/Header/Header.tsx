import { Settings } from 'lucide-react';

import { cn } from '~/lib/utils';
import { auth } from '~/server/auth';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';
import Logo from './Logo';
import SearchBar from './SearchBar';

type Props = { className?: string };
export default async function Header({ className }: Props) {
  const session = await auth();

  return (
    <header className={cn('flex items-center gap-2 p-4', className)}>
      <div className="flex min-w-[234px] items-center gap-4">
        <SidebarTrigger size="default" />
        <Logo />
      </div>

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
