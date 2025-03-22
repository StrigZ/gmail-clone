import { type ReactNode } from 'react';

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <main className="flex min-h-screen w-screen flex-col bg-green-300">
      <Header className="" />
      <div className="flex flex-1">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}
