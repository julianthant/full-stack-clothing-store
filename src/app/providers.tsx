// app/providers.tsx
'use client';

import { usePathname } from 'next/navigation';

import { NextUIProvider } from '@nextui-org/react';
import Navbar from '@/components/ui/Navbar';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <NextUIProvider>
      {!pathname.includes('/auth') && <Navbar />}
      {children}
    </NextUIProvider>
  );
}
