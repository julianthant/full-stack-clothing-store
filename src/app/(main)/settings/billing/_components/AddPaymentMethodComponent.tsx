'use client';

import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const AddPaymentMethodDialog = dynamic(
  () =>
    import('./AddPaymentMethodDialog').then(
      (mod) => mod.AddPaymentMethodDialog
    ),
  {
    ssr: false,
    loading: () => <Button className="max-sm:hidden">Add new card</Button>,
  }
);

const AddPaymentMethodDrawer = dynamic(
  () =>
    import('./AddPaymentMethodDrawer').then(
      (mod) => mod.AddPaymentMethodDrawer
    ),
  {
    ssr: false,
    loading: () => <Button className="sm:hidden">Add new card</Button>,
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
  const [open, setOpen] = useState(false);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });

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
        {isSmallScreen ? (
          <AddPaymentMethodDrawer user={user} open={open} setOpen={setOpen} />
        ) : (
          <AddPaymentMethodDialog user={user} open={open} setOpen={setOpen} />
        )}
      </CardFooter>
    </Card>
  );
};
