import { Skeleton } from '@nextui-org/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';

export const SettingsCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="w-full">
        <Skeleton className="h-4 w-1/5 rounded-sm" />
        <Skeleton className="h-4 w-3/5 rounded-sm" />
      </CardHeader>

      <CardContent>
        <Skeleton className="flex rounded-sm w-full h-8" />
      </CardContent>

      <CardFooter className="flex justify-between gap-2 border-t px-6 py-3">
        <Skeleton className="h-4 w-3/5 rounded-sm" />
        <Skeleton className="h-8 w-16 rounded-sm" />
      </CardFooter>
    </Card>
  );
};
