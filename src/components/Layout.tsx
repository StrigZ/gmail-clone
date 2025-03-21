import type { ReactNode } from 'react';

import Header from './Header/Header';
import Sidebar from './Sidebar';

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <main className="container mx-auto grid grid-cols-[250px,1fr] py-2">
      <Sidebar />
      <Header />
      {/* Sidebar */}
      {/* SettingsSidebar */}
      {/* EmailList or  */} {children}
    </main>
  );
}
