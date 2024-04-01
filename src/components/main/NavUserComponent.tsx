import { Skeleton } from '@nextui-org/react';
import { AvatarFallback } from '../utils/Avatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const NavUserComponent = () => {
  const user = useCurrentUser();

  return (
    <>
      {!!user ? (
        <div className="py-2 w-[200px] flex items-center space-x-2">
          <AvatarFallback userImage={user?.image || ''} />
          <div className="flex flex-col w-[160px]">
            <div className="truncate text-default-600 text-sm">
              {user?.name || 'Guest'}
            </div>
            <div className="truncate text-default-500 text-xs">
              {user?.email}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Skeleton className="flex rounded-full w-12 h-12" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      )}
    </>
  );
};
