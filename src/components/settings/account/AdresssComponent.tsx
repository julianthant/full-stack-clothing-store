import Link from 'next/link';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { toast, ToastContainer } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Divider, Skeleton, Spinner } from '@nextui-org/react';
import { PlusIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAddresssByUserId } from '@/actions/accountAddresses/get-address';
import { RemoveAddress } from '@/actions/accountAddresses/remove-address';

type Addresses =
  | {
      id: string;
      userId: string;
      fullName: string;
      streetAddress: string;
      streetOptional: string | null;
      city: string;
      country: string;
      states: string | null;
      zipCode: string;
      phoneNumber: string;
      deliveryInstructions: string | null;
      defaultAddress: boolean;
    }[]
  | null;

export const AddressComponent = () => {
  const [addresses, setAddresses] = useState<Addresses>();

  const [remove, setRemoved] = useState(false);

  const user = useCurrentUser();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const message = params.get('message');
  const success = params.get('success');

  useEffect(() => {
    (async () => {
      try {
        const addresses = await getAddresssByUserId(user?.id as string);
        setAddresses(addresses);
        setRemoved(false);
        router.replace(pathname + '?menu=Account&subMenu=Addresses');

        success === 'true' &&
          toast.success(decodeURI(message as string), {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'colored',
          });

        success === 'false' &&
          toast.error(decodeURI(message as string), {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'colored',
          });
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, user?.id, remove]);

  return (
    <div className="grid gap-4 relative grid-cols-4">
      <Card className="rounded-lg p-4 min-h-[319px]">
        <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
        <Button
          className="shadow-none"
          asChild
          onClick={() => router.push('/settings/edit/add-new-address')}
        >
          <CardContent className="hover:bg-foreground-200 bg-foreground-100 cursor-pointer flex flex-col items-center justify-center p-0 rounded-lg h-full border-2 border-dashed border-foreground-400">
            <PlusIcon size={70} className="text-foreground-400 mx-auto" />
            <div className="flex items-center justify-center">
              <p className="text-2xl font-bold text-foreground-600">
                Add Address
              </p>
            </div>
          </CardContent>
        </Button>
      </Card>

      {addresses ? (
        addresses.map((address) => (
          <Card
            key={address.id}
            className="h-full rounded-lg flex justify-between flex-col"
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
                address.defaultAddress ? 'px-5 pb-8' : 'p-5'
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
                  <Link href={`/settings/edit/edit-address?address-id=`}>
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
                    await RemoveAddress(address.id)
                      .then(() => {
                        setRemoved(true);
                        toast.success(`Removed address successfully!`, {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: false,
                          progress: undefined,
                          theme: 'colored',
                        });
                      })
                      .catch(() => {
                        toast.error(`Unable to remove address!`, {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: false,
                          progress: undefined,
                          theme: 'colored',
                        });
                      });
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
