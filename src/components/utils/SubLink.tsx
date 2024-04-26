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

  return (
    <div className="relative h-full flex items-center justify-center">
      <Link
        className={cn(
          'flex items-center text-muted-foreground hover:bg-muted hover:py-2 hover:rounded-sm hover:shadow-sm hover:text-black px-4',
          pathname === link &&
            'text-primary h-full hover:bg-transparent hover:rounded-none hover:shadow-none'
        )}
        href={link}
        prefetch
      >
        {formattedTitle}
      </Link>

      <div
        className={cn('absolute', {
          'bottom-0 h-1 w-full bg-black': pathname === link,
        })}
      />
    </div>
  );
};
