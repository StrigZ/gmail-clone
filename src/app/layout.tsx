import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import Layout from '~/components/Layout';
import Providers from '~/providers/providers';
import '~/styles/globals.css';

export const metadata: Metadata = {
  title: 'Create T3 App',
  description: 'Generated by create-t3-app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
