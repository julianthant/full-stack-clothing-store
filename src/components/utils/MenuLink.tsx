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
      className={cn({
        'font-semibold text-primary': link === pathname,
      })}
      href={link}
      prefetch
    >
      {title}
    </Link>
  );
};
