import type { Metadata } from 'next';
import { satoshi } from '@/lib/fonts';
import './globals.css';
import { Providers, QueryProvider } from './providers';
import 'react-toastify/dist/ReactToastify.css';
import { Suspense } from 'react';

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
      <body className={`antialiased ${satoshi.className}`}>
        <Providers>
          <QueryProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}
