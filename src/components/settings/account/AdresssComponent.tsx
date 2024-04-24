'use client';

import Link from 'next/link';
import axios from 'axios';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';
import { RemoveAddress } from '@/server/actions/accountAddresses/remove-address';

import { Button } from '@/components/ui/button';
import { Divider, Skeleton } from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const AddressComponent = () => {
  const user = useCurrentUser();
  const queryClient = useQueryClient();

  const { data: addresses } = useQuery({
    queryFn: () =>
      user
        ? axios.get(`/api/addresses/getAll/${user?.id}`).then((res) => res.data)
        : [],
    queryKey: ['addresses', { userId: user?.id as string }],
  });

  const { mutateAsync: removeAddress } = useMutation({
    mutationFn: (addressID: string) => RemoveAddress(addressID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast.success('Address removed successfully');
    },
    onError: (error) => {
      toast.error('Failed to remove address');
      console.error(error);
    },
  });

  return (
    <div className="grid gap-4 relative 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2">
      <Card className="rounded-lg p-4 min-h-[319px]">
        <Link href="/settings/edit/add-new-address">
          <CardContent className="hover:bg-foreground-200 bg-foreground-100 cursor-pointer flex flex-col items-center justify-center p-0 rounded-lg h-full border-2 border-dashed border-foreground-400">
            <PlusIcon size={70} className="text-foreground-400 mx-auto" />
            <div className="flex items-center justify-center">
              <p className="text-2xl font-bold text-foreground-600">
                Add Address
              </p>
            </div>
          </CardContent>
        </Link>
      </Card>

      {!!addresses ? (
        addresses.map((address: Address) => (
          <Card
            key={address.id}
            className="h-full rounded-lg flex justify-between flex-col min-h-[319px]"
          >
            {address.defaultAddress && (
              <CardHeader className="px-5 py-2 border-b">
                <CardTitle className="text-md font-semibold">
                  <p>Default Address</p>
                </CardTitle>
              </CardHeader>
            )}

            <CardContent
              className={cn(
                'grid gap-2',
                address.defaultAddress ? 'px-5 2xl:pb-5 max-2xl:pb-11' : 'p-5'
              )}
            >
              <div className="flex flex-col gap-2">
                <div className="grid gap-2">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-foreground-600 font-bold">
                      {address.fullName.toUpperCase()}
                    </p>

                    <p className="text-sm text-foreground-600">
                      {address.streetAddress.toUpperCase()}{' '}
                      {address.streetOptional &&
                        address.streetOptional.toUpperCase()}
                    </p>

                    <p className="text-sm text-foreground-600">
                      {address.city.toUpperCase()},{' '}
                      {address.states && address.states.toUpperCase()}{' '}
                      {address.zipCode}
                    </p>

                    <p className="text-sm text-foreground-600">
                      {address.country}
                    </p>

                    <p className="text-sm text-foreground-600">
                      Phone number: {address.phoneNumber}
                    </p>

                    <Link href={''} className="text-sm text-teal-600">
                      Add delivery instructions
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-5">
              <div className="flex gap-4">
                <Button asChild className="p-0 text-teal-600" variant={'link'}>
                  <Link
                    href={`/settings/edit/edit-address?address-id=${address.id}`}
                  >
                    Edit
                  </Link>
                </Button>
                <Divider
                  orientation="vertical"
                  className="h-4 w-[2px] my-auto bg-foreground-500"
                />
                <form
                  className="my-auto h-min"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    await removeAddress(address.id);
                  }}
                >
                  <Button
                    type="submit"
                    variant={'link'}
                    className="w-min p-0 mr-1 h-min text-red-500"
                  >
                    Remove
                  </Button>
                </form>
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <Card className="rounded-lg flex flex-col justify-between">
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
      )}
    </div>
  );
};
