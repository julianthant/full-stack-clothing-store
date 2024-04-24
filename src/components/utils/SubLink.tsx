'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type MenuLinkProps = {
  title: string;
  path: string;
};

export const SubLink = ({ title, path }: MenuLinkProps) => {
  const pathname = usePathname();

  const link = `/settings/${path.toLowerCase()}`;

  const formattedTitle = title.replace(/-/g, ' ');

  console.log(pathname, link);

  return (
    <Link
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
        pathname === link && 'bg-muted text-primary'
      )}
      href={link}
    >
      {formattedTitle}
    </Link>
  );
};
