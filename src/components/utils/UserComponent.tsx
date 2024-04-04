'use client';

import { Skeleton } from '@nextui-org/react';
import { AvatarFallback } from '../utils/Avatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const UserComponent = () => {
  const user = useCurrentUser();

  return (
    <div>
      {!!user ? (
        <div className="py-2 flex items-center space-x-2">
          <AvatarFallback userImage={user?.image} />
          <div className="flex flex-col lg:w-[190px] w-[150px]">
            <div className="truncate text-default-600 text-sm">
              {user?.name || 'Guest'}
            </div>
            <div className="truncate text-default-500 text-xs">
              {user?.email}
            </div>
          </div>
        </div>
      ) : (
        <div className="pb-2 p-3 w-[200px] flex items-center space-x-2">
          <div>
            <Skeleton className="flex rounded-full w-8 h-8" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};
