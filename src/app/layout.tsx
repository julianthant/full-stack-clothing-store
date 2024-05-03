import './globals.css';

import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

import { Satoshi } from './fonts/fonts';
import { Providers, QueryProvider } from './providers';

const DynamicToaster = dynamic(() =>
  import('@/components/ui/toaster').then((mod) => mod.Toaster)
);

export const metadata: Metadata = {
  title: 'StyleZ - The only fashion store you need',
  description: 'Buy your favorite clothes here',
  icons: {
    icon: ['/favicon.ico'],
    apple: ['/favicon.ico'],
    shortcut: ['./favicon.ico'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${Satoshi.className} min-h-dvh`}>
        <Providers>
          <QueryProvider>
            {children}
            <DynamicToaster />
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}
