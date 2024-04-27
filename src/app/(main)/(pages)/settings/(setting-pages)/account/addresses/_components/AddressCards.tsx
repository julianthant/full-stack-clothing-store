import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Divider } from '@nextui-org/divider';

import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RemoveAddress } from '@/server/actions/accountAddresses/remove-address';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState } from 'react';

export const AddressCards = ({ addresses }: any) => {
  const [loadMore, setLoadMore] = useState(false);

  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutateAsync: removeAddress } = useMutation({
    mutationFn: (addressID: string) => RemoveAddress(addressID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
      toast({
        title: 'Address: Remove',
        description: 'Address removed successfully!',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Address: Remove',
        description: 'Unable to remove address!',
      });
      console.error(error);
    },
  });

  const ModifiedAddresses = loadMore ? addresses : addresses.slice(0, 1);

  return (
    <div className="flex flex-col gap-4">
      {ModifiedAddresses.map((address: Address) => (
        <Card
          key={address.id}
          className="rounded-lg flex justify-between flex-col h-[319px]"
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
                  href={`/settings/forms/address/update-address?address-id=${address.id}`}
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
      ))}

      {addresses.length > 1 && !loadMore && (
        <Button onClick={() => setLoadMore(true)} className="w-full lg:hidden">
          Load More
        </Button>
      )}
    </div>
  );
};
