'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '~/lib/utils';

import { Button } from './button';

interface CollapsibleButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSidebarOpen: boolean;
  icon: ReactNode;
  children: ReactNode;
}

export function CollapsibleButton({
  isSidebarOpen,
  icon,
  children,
  className,
  ...props
}: CollapsibleButtonProps) {
  return (
    <Button
      className={cn(
        'relative h-14 overflow-hidden rounded-2xl transition-all duration-300 ease-out',
        isSidebarOpen ? 'w-32' : 'w-12',
        className,
      )}
      {...props}
    >
      <span className="absolute left-4 flex items-center justify-center">
        {icon}
      </span>
      <span
        className={cn(
          'absolute left-12 whitespace-nowrap opacity-0 transition-opacity duration-200',
          isSidebarOpen && 'opacity-100 delay-100',
        )}
      >
        {children}
      </span>
    </Button>
  );
}
