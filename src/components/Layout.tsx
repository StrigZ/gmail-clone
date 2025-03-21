import type { ReactNode } from 'react';

import EmailList from './EmailList';
import Header from './Header/Header';
import Sidebar from './Sidebar';

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <main className="grid w-screen grid-cols-[min-content,1fr] grid-rows-[64px,1fr] bg-green-300">
      <Header className="col-span-full" />
      <Sidebar />
      <EmailList />
      {/* SettingsSidebar */}
      {/* EmailList or  */} {children}
    </main>
  );
}
