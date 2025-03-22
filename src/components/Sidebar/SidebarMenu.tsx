import { FileSpreadsheet, Inbox, SendHorizontal, Star } from 'lucide-react';
import { type ReactNode } from 'react';

import { cn } from '~/lib/utils';

import { Button } from '../ui/button';

type SidebarContent = {
  icon: ReactNode;
  displayText: string;
};

const sidebarContent: SidebarContent[] = [
  {
    icon: <Inbox />,
    displayText: 'Inbox',
  },
  { icon: <Star />, displayText: 'Starred' },
  { icon: <SendHorizontal />, displayText: 'Sent' },
  { icon: <FileSpreadsheet />, displayText: 'Draft' },
];

type Props = { isSidebarOpen: boolean };
export default function SidebarMenu({ isSidebarOpen }: Props) {
  return (
    <ul>
      {sidebarContent.map((item) => (
        <li key={item.displayText}>
          <Button
            className={cn('h-8', {
              'ml-4 w-8 justify-center gap-0 rounded-full': !isSidebarOpen,
              'w-11/12 justify-start gap-4 rounded-xl rounded-l-none pl-6':
                isSidebarOpen,
            })}
            variant="ghost"
          >
            {item.icon}
            <span
              className={cn('transition-[opacity,transform]', {
                'hidden scale-0 opacity-0': !isSidebarOpen,
                'inline scale-100 opacity-100': isSidebarOpen,
              })}
            >
              {item.displayText}
            </span>
          </Button>
        </li>
      ))}
    </ul>
  );
}
