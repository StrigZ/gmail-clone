'use client';

import { FileSpreadsheet, Inbox, SendHorizontal, Star } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

import { cn } from '~/lib/utils';

import { Button } from '../ui/button';

type SidebarContent = {
  icon: ReactNode;
  path: string;
};

const sidebarContent: SidebarContent[] = [
  {
    icon: <Inbox />,
    path: 'inbox',
  },
  { icon: <Star />, path: 'starred' },
  { icon: <SendHorizontal />, path: 'sent' },
  { icon: <FileSpreadsheet />, path: 'draft' },
];

type Props = { isSidebarOpen: boolean };
export default function SidebarMenu({ isSidebarOpen }: Props) {
  const router = useRouter();
  const { category } = useParams<{ category: string }>();

  return (
    <ul>
      {sidebarContent.map((item) => (
        <li key={item.path}>
          <Button
            className={cn('h-8', {
              'ml-4 w-8 justify-center gap-0 rounded-full': !isSidebarOpen,
              'w-11/12 justify-start gap-4 rounded-xl rounded-l-none pl-6':
                isSidebarOpen,
              'bg-accent/75 text-accent-foreground': category === item.path,
            })}
            variant="ghost"
            onClick={() => router.push('/' + item.path)}
          >
            {item.icon}
            <span
              className={cn('transition-[opacity,transform]', {
                'hidden scale-0 opacity-0': !isSidebarOpen,
                'inline scale-100 opacity-100': isSidebarOpen,
              })}
            >
              {item.path[0]?.toUpperCase() + item.path.slice(1)}
            </span>
          </Button>
        </li>
      ))}
    </ul>
  );
}
