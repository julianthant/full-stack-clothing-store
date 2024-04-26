import { Skeleton } from '@nextui-org/react';

export const UserEditFormSkeleton = () => {
  return (
    <div className="w-full grid gap-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-1/5 rounded-lg" />
        <Skeleton className="h-4 w-[10%] rounded-lg" />
      </div>
      <Skeleton className="h-4 w-[70%] rounded-lg" />
    </div>
  );
};
