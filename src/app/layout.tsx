import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';

import { Satoshi } from './fonts/fonts';
import { Suspense } from 'react';
import { Providers, QueryProvider } from './providers';

export const metadata: Metadata = {
  title: 'Clothes.co',
  description: 'Buy your favorite clothes here',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${Satoshi.className}`}>
        <Providers>
          <QueryProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}
