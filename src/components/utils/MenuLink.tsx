'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type MenuLinkProps = {
  title: string;
  path: string;
};

export const MenuLink = ({ title, path }: MenuLinkProps) => {
  const pathname = usePathname();

  const link = `/settings/${title.toLowerCase()}/${path.toLowerCase()}`;

  return (
    <Link
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
        pathname === link && 'bg-muted text-primary'
      )}
      href={link}
    >
      {title}
    </Link>
  );
};
