import Link from 'next/link';
import Image from 'next/image';
import BlackCard from '../../images/black-card.png';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { roboto } from '@/components/utils/Fonts';
import { getPaymentMethodsByUserId } from '@/data/get-payment-method';

import { RemovePaymentMethod } from '@/actions/accountPayments/remove-payment-method';
import { toast, ToastContainer } from 'react-toastify';

import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';
import { Divider, Skeleton, Spinner } from '@nextui-org/react';
import { PlusCircle } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const PaymentComponent = () => {
  const [selectedCard, setSelectedCard] = useState(0);

  const user = useCurrentUser();
  const queryClient = useQueryClient();

  const router = useRouter();
  const params = useSearchParams();

  const message = params.get('message');
  const success = params.get('success');

  useEffect(() => {
    if (success === 'true') {
      toast.success(message);
    } else if (success === 'false') {
      toast.error(message);
    }

    router.replace('/settings?menu=Account&subMenu=Payments');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const { data: paymentMethods, isLoading } = useQuery({
    queryFn: () =>
      user
        ? axios.get(`/api/payments/getAll/${user?.id}`).then((res) => res.data)
        : [],
    queryKey: ['payment-methods', { userId: user?.id as string }],
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

  return (
    <div className="sm:flex grid gap-4">
      <Card className="h-min">
        <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
          <CardDescription>Methods & Accounts</CardDescription>
        </CardHeader>
        <CardContent className="grid bg-foreground-100 p-0 rounded-b-lg">
          {!!paymentMethods ? (
            paymentMethods.map((card: PaymentMethod, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedCard(index)}
                className={cn(
                  'hover:cursor-pointer hover:bg-foreground-200',
                  selectedCard === index && 'bg-foreground-200'
                )}
              >
                <div className="relative flex w-[340px] items-center justify-start px-6 py-4 gap-3">
                  <div className="relative">
                    <Image
                      src={BlackCard}
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
                    <h3 className={`${roboto.className} font-bold text-sm`}>
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
              <div className="px-6 py-4 w-[340px] flex items-center gap-3 justify-start">
                <div>
                  <Skeleton className="flex rounded-md w-[85px] h-[53.45px]" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-4 w rounded-lg" />
                  <Skeleton className="h-4 w-3/5 rounded-lg" />
                </div>
              </div>

              <Divider />

              <div className="px-6 py-4 w-[340px] flex items-center gap-3 justify-start">
                <div>
                  <Skeleton className="flex rounded-md w-[85px] h-[53.45px]" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Skeleton className="h-4 w rounded-lg" />
                  <Skeleton className="h-4 w-3/5 rounded-lg" />
                </div>
              </div>

              <Divider />
            </>
          )}

          <Link href="/settings/edit/add-payment-method">
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

      {!!paymentMethods && paymentMethods?.length > 0 && (
        <Card className="h-min">
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
                src={BlackCard}
                alt={paymentMethods[selectedCard].cardHolder + "'s Card"}
                width={300}
                height={189}
                priority
                style={{ width: '300px', height: 'auto' }}
              />
              <p className="absolute top-[20px] left-[30px]">
                {paymentMethods[selectedCard].bankName}
              </p>
              <p className="absolute top-[120px] left-[30px]">
                {paymentMethods[selectedCard].expiryMonth.padStart(2, '0')}/
                {paymentMethods[selectedCard].expiryYear}
              </p>
              <p className="absolute top-[145px] left-[30px]">
                {paymentMethods[selectedCard].cardHolder}
              </p>
              {paymentMethods[selectedCard].cardScheme === 'MASTERCARD' && (
                <Icons.masterCardLogo className="absolute top-[116px] right-[37px] w-20 h-20" />
              )}
              {paymentMethods[selectedCard].cardScheme === 'VISA' && (
                <Icons.visaLogo className="absolute top-[115px] right-[42px] w-20 h-20" />
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
