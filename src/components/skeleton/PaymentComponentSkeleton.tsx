import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const PaymentComponentSkeleton = () => {
  return (
    <Card className="h-min sm:w-[362px] max-sm:max-w-[295px]">
      <CardHeader>
        <Skeleton className="h-4 w-1/5 rounded-lg" />
        <Skeleton className="h-4 w-3/5 rounded-lg" />
      </CardHeader>
      <CardContent className="grid bg-foreground-100 p-0 rounded-b-lg w-full">
        <div className="px-6 py-4 w-full flex items-center gap-3 justify-start">
          <div>
            <Skeleton className="flex rounded-md w-[85px] h-[53.45px]" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-4 w-1/3 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
          </div>
        </div>

        <Divider />

        <div className="px-6 py-4 w-full flex items-center gap-3 justify-start">
          <div>
            <Skeleton className="flex rounded-md w-[85px] h-[53.45px]" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-4 w-1/3 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
          </div>
        </div>

        <Divider />

        <div className="flex hover:cursor-pointer hover:bg-foreground-200 bg-foreground-100 px-6 py-4 gap-3 rounded-b-lg w-full">
          <Skeleton className="min-w-[95px] h-14 rounded-lg" />
          <div className="flex items-center justify-start w-full">
            <Skeleton className="h-4 w-full rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
