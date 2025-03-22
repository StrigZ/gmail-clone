'use client';

import { useState } from 'react';

import { cn } from '~/lib/utils';

import EmailFormWrapper from './EmailFormWrapper';
import MenuButton from './MenuButton';
import SidebarMenu from './SidebarMenu';

type Props = { className?: string };
export default function Sidebar({ className }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => setIsSidebarOpen((pv) => !pv);

  return (
    <div
      className={cn(
        'col-start-1 flex flex-col gap-4 transition-[width]',
        {
          'w-[250px]': isSidebarOpen,
          'w-[72px]': !isSidebarOpen,
        },
        className,
      )}
    >
      <MenuButton handleSidebarOpen={handleSidebarOpen} />

      <div className="px-2">
        <EmailFormWrapper isSidebarOpen={isSidebarOpen} />
      </div>

      <SidebarMenu isSidebarOpen={isSidebarOpen} />
    </div>
  );
}
