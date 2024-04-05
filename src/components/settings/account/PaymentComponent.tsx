import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { roboto } from '@/components/utils/Fonts';
import { Button } from '@/components/ui/button';
import { Divider } from '@nextui-org/react';
import { PlusCircle } from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { toast, ToastContainer } from 'react-toastify';
import { RemovePaymentMethod } from '@/actions/remove-payment-method';

type PaymentComponentProps = {
  paymentMethods:
    | {
        id: string;
        userId: string;
        cardType: string;
        cardImage: string;
        cardHolder: string;
        cardNumber: string;
        expiryMonth: string;
        expiryYear: string;
        cvc: string;
      }[]
    | null;
};

export const PaymentComponent = ({ paymentMethods }: PaymentComponentProps) => {
  const [selectedCard, setSelectedCard] = useState(0);

  return (
    <div className="sm:flex grid gap-4">
      <Card className="h-min">
        <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
          <CardDescription>Methods & Accounts</CardDescription>
        </CardHeader>
        <CardContent className="grid bg-foreground-100 p-0 rounded-b-lg">
          {!!paymentMethods &&
            paymentMethods.map((card, index) => (
              <div
                key={index}
                onClick={() => setSelectedCard(index)}
                className={cn(
                  'hover:cursor-pointer hover:bg-foreground-200',
                  selectedCard === index && 'bg-foreground-200'
                )}
              >
                <div className="flex w-[320px] items-center justify-left px-6 py-4 gap-3">
                  <Image
                    src={card.cardImage}
                    className="aspect-auto"
                    alt="Credit Card"
                    width={95}
                    height={60}
                  />
                  <div className=" rounded-lg">
                    <h3 className={`${roboto.className} font-bold text-sm`}>
                      {card.cardType}
                    </h3>
                    <p className="text-xs">
                      Card ending in &#x2022;&#x2022;&#x2022;&#x2022;{' '}
                      {card.cardNumber.slice(-4)}
                    </p>
                  </div>
                </div>

                <Divider />
              </div>
            ))}

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
                <CardDescription className="w-44">
                  {paymentMethods[selectedCard].cardType}
                </CardDescription>
              </div>
              <form
                className="ml-auto h-min"
                onSubmit={async (event) => {
                  event.preventDefault();
                  await RemovePaymentMethod(paymentMethods[selectedCard].id)
                    .then(() =>
                      toast.success(
                        `Removed Card Ending in ${paymentMethods[
                          selectedCard
                        ].cardNumber.slice(-4)}`,
                        {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: false,
                          progress: undefined,
                          theme: 'colored',
                        }
                      )
                    )
                    .catch(() => {
                      toast.error('Unable to remove card!', {
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
          </CardHeader>

          <CardContent className="grid gap-2">
            <Image
              src={paymentMethods[selectedCard].cardImage}
              alt={paymentMethods[selectedCard].cardHolder + "'s Card"}
              width={300}
              height={189}
            />

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
