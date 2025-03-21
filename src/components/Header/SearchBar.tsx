import { Search, X } from 'lucide-react';

import { cn } from '~/lib/utils';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

type Props = { className?: string };
export default function SearchBar({ className }: Props) {
  return (
    <div
      className={cn(
        'flex items-center rounded-full border border-input bg-transparent px-3 py-1 shadow-sm transition-colors focus-within:bg-background focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
    >
      <Button size="icon" variant="ghost" className="rounded-full">
        <Search />
      </Button>
      <Input
        className="flex-1 border-none shadow-none focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Search mail"
      />
      <Button size="icon" variant="ghost" className="rounded-full">
        <X />
      </Button>
    </div>
  );
}
