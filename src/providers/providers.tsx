import type { ReactNode } from 'react';

import { SidebarProvider } from '~/components/ui/sidebar';
import { TRPCReactProvider } from '~/trpc/react';

type Props = { children: ReactNode };
export default function Providers({ children }: Props) {
  return (
    <TRPCReactProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </TRPCReactProvider>
  );
}
