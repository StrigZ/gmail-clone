'use client';

import { FileSpreadsheet, Inbox, SendHorizontal, Star } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '~/lib/utils';

import { buttonVariants } from './ui/button';
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './ui/sidebar';

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

type Props = {};
export default function Sidebar({}: Props) {
  const { state } = useSidebar();

  return (
    <SidebarContainer
      className="flex items-center gap-2 border-none bg-transparent pb-4"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup className="p-0">
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarContent.map((item) => (
                <SidebarMenuItem key={item.displayText} className="px-0">
                  <SidebarMenuButton
                    className={cn('rounded-r-full px-4', {
                      'rounded-full': state === 'collapsed',
                    })}
                  >
                    <span
                      className={buttonVariants({
                        variant: 'ghost',
                        size: 'icon',
                        className: '!h-8 !w-8',
                      })}
                    >
                      {item.icon}
                    </span>
                    <span>{item.displayText}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarContainer>
  );
}
