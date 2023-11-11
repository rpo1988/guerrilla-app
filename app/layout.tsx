import type { Metadata } from 'next';
import { Mulish } from 'next/font/google';
import { PropsWithChildren } from 'react';

import './globals.css';
import ApolloAppProvider from './providers/ApolloProvider';

export type RootLayoutProps = PropsWithChildren;

const mulish = Mulish({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lugar | Real Estate',
  description: 'Real estate farm that makes your dreams true',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className={mulish.className}>
        <ApolloAppProvider>{children}</ApolloAppProvider>
      </body>
    </html>
  );
}
