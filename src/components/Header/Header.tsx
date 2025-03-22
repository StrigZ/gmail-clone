import { Settings } from 'lucide-react';

import { cn } from '~/lib/utils';

import { Button } from '../ui/button';
import Logo from './Logo';
import SearchBar from './SearchBar';
import UserAvatar from './UserAvatar';

type Props = { className?: string };
export default async function Header({ className }: Props) {
  return (
    <header className={cn('flex items-center py-4 pr-4', className)}>
      <Logo className="w-[250px] pl-[72px]" />
      <SearchBar className="max-w-2xl flex-1" />

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings />
        </Button>

        <UserAvatar />
      </div>
    </header>
  );
}
