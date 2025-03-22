'use client';

import { Pencil } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '~/lib/utils';

import { Button } from '../ui/button';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSidebarOpen: boolean;
  className?: string;
};

export default function ComposeButton({
  isSidebarOpen,
  className,
  ...props
}: Props) {
  return (
    <Button
      className={cn(
        'relative h-14 overflow-hidden rounded-2xl transition-all duration-300 ease-out',
        isSidebarOpen ? 'w-32' : 'w-12',
        className,
      )}
      type="button"
      {...props}
    >
      <span className="absolute left-4 flex items-center justify-center">
        <Pencil />
      </span>
      <span
        className={cn(
          'absolute left-12 whitespace-nowrap opacity-0 transition-opacity duration-200',
          isSidebarOpen && 'opacity-100 delay-100',
        )}
      >
        Compose
      </span>
    </Button>
  );
}
