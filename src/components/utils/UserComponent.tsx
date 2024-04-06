'use client';

import { Skeleton } from '@nextui-org/react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarIcon } from '@nextui-org/react';
import { cn } from '@/lib/utils';

type UserComponentProps = {
  page: 'Navbar' | 'Profile';
};

export const UserComponent = ({ page }: UserComponentProps) => {
  const user = useCurrentUser();

  return (
    <div>
      {!!user ? (
        <div
          className={cn(
            'py-2 flex items-center space-x-2',
            page === 'Navbar' && 'w-[200px]'
          )}
        >
          <Avatar className="w-9 h-9">
            <AvatarImage src={user?.image as string} />
            <AvatarFallback>
              <AvatarIcon />
            </AvatarFallback>
          </Avatar>
          <div
            className={cn(
              'flex flex-col lg:w-[190px] w-[150px]',
              page === 'Navbar' && 'lg:w-full w-[160]'
            )}
          >
            <div className="truncate text-default-600 text-sm">
              {user?.name}
            </div>
            <div className="truncate text-default-500 text-xs">
              {user?.email}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-2 w-[200px] flex items-center space-x-2">
          <div>
            <Skeleton className="flex rounded-full w-9 h-9" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-4/5 rounded-lg" />
            <Skeleton className="h-3 rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};
