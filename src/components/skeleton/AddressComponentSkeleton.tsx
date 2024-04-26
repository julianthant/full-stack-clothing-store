import { Card } from '../ui/card';
import { Skeleton } from '@nextui-org/skeleton';

export const AddressComponentSkeleton = () => {
  return (
    <Card className="rounded-lg flex flex-col justify-between h-[319px]">
      <div className="grid gap-3  p-5">
        <Skeleton className="h-4 w-2/3 rounded-md" />

        <div className="grid gap-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-1/3 rounded-md" />
          <Skeleton className="h-4 w-2/4 rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-4/6 rounded-md" />
        </div>
      </div>

      <div className="p-5 py-7">
        <Skeleton className="h-4 w-3/5 rounded-md" />
      </div>
    </Card>
  );
};
