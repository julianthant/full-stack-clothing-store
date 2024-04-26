import { Skeleton } from '@nextui-org/react';
import { Card } from '../ui/card';

export const AddressAddSkeleton = () => {
  return (
    <Card className="2xl:w-[269.5px] xl:w-[279.33px] lg:w-[299px] w-full h-[319px] p-4">
      <Skeleton className="border-2 border-dashed w-full h-full border-foreground-400 rounded-lg" />
    </Card>
  );
};
