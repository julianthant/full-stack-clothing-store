import { Skeleton } from '@nextui-org/skeleton';

export const UserComponentSkeleton = () => {
  return (
    <div className="py-2 w-[200px] flex items-center space-x-2 justify-start">
      <div>
        <Skeleton className="flex rounded-full w-9 h-9" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-4/5 rounded-lg" />
        <Skeleton className="h-3 w-full rounded-lg" />
      </div>
    </div>
  );
};
