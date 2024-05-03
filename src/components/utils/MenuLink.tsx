'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type MenuLinkProps = {
  title: string;
};

export const MenuLink = ({ title }: MenuLinkProps) => {
  const pathname = usePathname();

  const link = `/settings/${title.toLowerCase()}`;

  return (
    <Link
      className={cn('hover:bg-muted px-3 py-2.5 rounded-lg', {
        'font-semibold text-primary': link === pathname,
      })}
      href={link}
      prefetch
    >
      {title}
    </Link>
  );
};
