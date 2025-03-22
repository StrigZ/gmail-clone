import type { ReactNode } from 'react';

import { TRPCReactProvider } from '~/trpc/react';

type Props = { children: ReactNode };
export default function Providers({ children }: Props) {
  return <TRPCReactProvider>{children}</TRPCReactProvider>;
}
