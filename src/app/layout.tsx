import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Shop.co',
  description: 'Buy your favorite clothes here',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
