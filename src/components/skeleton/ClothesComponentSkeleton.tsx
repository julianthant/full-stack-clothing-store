import { Skeleton } from '@nextui-org/react';

export const ClothesComponentSkeleton = () => {
  return (
    <div className="grid gap-2 max-w-fit">
      <Skeleton className="h-[359px] rounded-sm w-[290px]" />
      <Skeleton className="h-4 w-full rounded-sm" />
      <Skeleton className="h-4 w-1/3 rounded-sm" />
    </div>
  );
};
