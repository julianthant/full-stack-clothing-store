'use client';

import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

import { cn } from '@/lib/utils';
import { toast } from 'react-toastify';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { RemovePaymentMethod } from '@/server/actions/accountPayments/remove-payment-method';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';
import { Divider } from '@nextui-org/divider';
import { Skeleton } from '@nextui-org/skeleton';
import { PlusCircle } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const PaymentComponent = () => {
  const [selectedCard, setSelectedCard] = useState(0);

  const user = useCurrentUser();
  const userId = user?.id;

  const params = useSearchParams();
  const success = params.get('success');

  const queryClient = useQueryClient();

  const { data: paymentMethods, refetch } = useQuery({
    queryFn: () =>
      axios.get(`/api/payments/getAll/${userId}`).then((res) => res.data),
    queryKey: ['payment-methods', userId],
    staleTime: 1000 * 60 * 10,
    enabled: !!userId,
  });

  const { mutateAsync: removePaymentMethod } = useMutation({
    mutationFn: (paymentMethodID: string) =>
      RemovePaymentMethod(paymentMethodID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast.success('Payment method removed successfully!');
    },
    onError: (error) => {
      toast.error('Failed to remove payment method!');
      console.error(error);
    },
  });

  useEffect(() => {
    if (success) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <div className="xl:flex grid gap-4">
      <Card className="h-min sm:w-[362px] max-sm:max-w-[295px]">
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
          <CardDescription>Methods & Accounts</CardDescription>
        </CardHeader>
        <CardContent className="grid bg-foreground-100 p-0 rounded-b-lg">
          {paymentMethods || (paymentMethods && paymentMethods.length > 0) ? (
            paymentMethods.map((card: PaymentMethod, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedCard(index)}
                className={cn(
                  'hover:cursor-pointer hover:bg-foreground-200',
                  selectedCard === index && 'bg-foreground-200'
                )}
              >
                <div className="relative flex items-center justify-start px-6 py-4 gap-3">
                  <div className="relative">
                    <Image
                      src="https://utfs.io/f/5483fbf9-493f-4902-9eeb-bef7e3d52b91-rv006a.png"
                      className="max-w-[85px]"
                      alt="Credit Card"
                      width={85}
                      height={53}
                    />
                    {card.default && (
                      <>
                        <div className="absolute bg-green-600 right-0 top-2 w-6 h-4" />
                        <div className="absolute bg-green-600 right-5 top-2 w-6 h-4 -skew-x-[150deg]" />
                        <p className="absolute right-[0.2rem] top-2 text-[0.65rem] text-center text-black">
                          Default
                        </p>
                      </>
                    )}
                  </div>

                  <div className=" rounded-lg">
                    <h3 className={`font-bold text-sm max-sm:text-xs`}>
                      {card.bankName} {card.cardScheme} {card.cardType} CARD
                    </h3>
                    <p className="text-xs">
                      Card ending in &#x2022;&#x2022;&#x2022;&#x2022;{' '}
                      {card.lastFourNumbers}
                    </p>
                  </div>

                  {index === selectedCard && (
                    <div className="absolute bg-orange-500 w-1 h-full left-0" />
                  )}
                </div>

                <Divider />
              </div>
            ))
          ) : (
            <>
              <div className="px-6 py-4 w-full flex items-center gap-3 justify-start">
                <div>
                  <Skeleton className="flex rounded-md min-w-[85px] h-[53.45px]" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-4 w-2/5 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                </div>
              </div>

              <Divider />

              <div className="px-6 py-4 w-full flex items-center gap-3 justify-start">
                <div>
                  <Skeleton className="flex rounded-md min-w-[85px] h-[53.45px]" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-4 w-2/5 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                </div>
              </div>

              <Divider />
            </>
          )}

          <Link href="/settings/forms/payment/add-payment-method">
            <div className="flex hover:cursor-pointer hover:bg-foreground-200 bg-foreground-100 px-6 py-4 gap-3 rounded-b-lg">
              <div className="border-2 border-dotted w-[95px] h-14 border-foreground-400 flex items-center justify-center">
                <PlusCircle size={24} className="text-foreground-400" />
              </div>
              <div className="flex items-center justify-center">
                <p className="text-sm text-teal-600">Add a payment method</p>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>

      {paymentMethods?.length > 0 && (
        <Card className="h-min sm:w-min max-sm:max-w-[295px]">
          <CardHeader>
            <div className="flex justify-between pl-1">
              <div className="grid gap-2">
                <CardTitle>
                  {paymentMethods[selectedCard].cardHolder}&apos;s
                </CardTitle>
                <CardDescription className="w-48">
                  {paymentMethods[selectedCard].cardScheme}{' '}
                  {paymentMethods[selectedCard].cardType} CARD
                </CardDescription>
              </div>
              <form
                className="ml-auto h-min"
                onSubmit={async (event) => {
                  event.preventDefault();
                  await removePaymentMethod(paymentMethods[selectedCard].id);
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
          </CardHeader>

          <CardContent className="grid gap-2">
            <div className="relative font-bold text-white">
              <Image
                src="https://utfs.io/f/5483fbf9-493f-4902-9eeb-bef7e3d52b91-rv006a.png"
                alt={paymentMethods[selectedCard].cardHolder + "'s Card"}
                width={312}
                height={195}
                priority
                className="sm:max-w-[312px] max-w-full aspect-auto h-auto"
              />
              <p className="absolute top-[20px] left-[30px] max-sm:text-sm max-sm:left-[25px]">
                {paymentMethods[selectedCard].bankName}
              </p>
              <p className="absolute top-[120px] max-sm:top-[95px] max-sm:text-sm left-[30px] max-sm:left-[25px]">
                {paymentMethods[selectedCard].expiryMonth.padStart(2, '0')}/
                {paymentMethods[selectedCard].expiryYear}
              </p>
              <p className="absolute top-[150px] max-sm:top-[118px] max-sm:text-sm left-[30px] max-sm:left-[25px]">
                {paymentMethods[selectedCard].cardHolder}
              </p>
              {paymentMethods[selectedCard].cardScheme === 'MASTERCARD' && (
                <Icons.masterCardLogo className="absolute top-[121px] max-sm:top-[89px] right-[37px] w-20 h-20" />
              )}
              {paymentMethods[selectedCard].cardScheme === 'VISA' && (
                <Icons.visaLogo className="absolute top-[120px] max-sm:top-[88px] right-[42px] w-20 h-20 max-sm:w-14" />
              )}
            </div>

            <div className="mr-auto">
              <Button
                asChild
                className="w-full p-0 ml-1 text-teal-600"
                variant={'link'}
              >
                <Link
                  href={`/settings/edit/edit-payment-method?card-id=${paymentMethods[selectedCard].id}`}
                >
                  Edit
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
