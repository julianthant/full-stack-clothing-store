'use client';

import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const AddShippingAddressDialog = dynamic(
  () =>
    import('./AddShippingAddressDialog').then(
      (mod) => mod.AddShippingAddressDialog
    ),
  {
    ssr: false,
    loading: () => <Button className="max-sm:hidden">Add new card</Button>,
  }
);

const AddShippingAddressDrawer = dynamic(
  () =>
    import('./AddShippingAddressDrawer').then(
      (mod) => mod.AddShippingAddressDrawer
    ),
  {
    ssr: false,
    loading: () => <Button className="sm:hidden">Add new address</Button>,
  }
);

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const AddShippingAddressComponent = ({ user }: any) => {
  const [open, setOpen] = useState(false);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Addresses</CardTitle>
        <CardDescription>
          To add a new shipping address, please click the button below.
        </CardDescription>
      </CardHeader>
      <CardFooter
        className={cn('border-t px-6 py-3 rounded-b-xl flex justify-end')}
      >
        {isSmallScreen ? (
          <AddShippingAddressDrawer user={user} open={open} setOpen={setOpen} />
        ) : (
          <AddShippingAddressDialog user={user} open={open} setOpen={setOpen} />
        )}
      </CardFooter>
    </Card>
  );
};
