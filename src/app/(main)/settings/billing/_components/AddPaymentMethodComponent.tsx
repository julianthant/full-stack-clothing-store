'use client';

import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const AddPaymentMethodDialog = dynamic(
  () =>
    import('./AddPaymentMethodDialog').then(
      (mod) => mod.AddPaymentMethodDialog
    ),
  {
    ssr: false,
    loading: () => <Button variant="outline">Add new card</Button>,
  }
);

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const AddPaymentMethodComponent = ({ user }: any) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>
          You have not yet added any cards. Click the button below to add one.
        </CardDescription>
      </CardHeader>
      <CardFooter
        className={cn('border-t px-6 py-3 rounded-b-xl flex justify-end')}
      >
        <AddPaymentMethodDialog user={user} />
      </CardFooter>
    </Card>
  );
};
