import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { roboto } from '@/components/utils/Fonts';
import { Button } from '@/components/ui/button';
import { Divider } from '@nextui-org/react';
import { PlusCircle } from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';
import CreditCardImage from '../../images/credit-card-example.png';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/Input';

type PaymentComponentProps = {
  paymentMethods:
    | {
        id: string;
        userId: string;
        cardType: string;
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
      <Card>
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
                    src={CreditCardImage}
                    className="aspect-auto"
                    alt="Credit Card"
                    width={95}
                  />
                  <div className=" rounded-lg">
                    <h3 className={`${roboto.className} font-bold text-sm`}>
                      {card.cardType}
                    </h3>
                    <p className="text-xs">
                      Card ending in **** {card.cardNumber.slice(-4)}
                    </p>
                  </div>
                </div>

                <Divider />
              </div>
            ))}

          <Link href="/settings/edit/add-payment-method">
            <div
              className={cn(
                'flex hover:cursor-pointer hover:bg-foreground-200 bg-foreground-100 px-6 py-4 gap-3',
                paymentMethods && paymentMethods?.length >= 3 && 'rounded-b-lg'
              )}
            >
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
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              {paymentMethods[selectedCard].cardHolder}&apos;s
            </CardTitle>
            <CardDescription>
              {paymentMethods[selectedCard].cardType}
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <Image
              src={CreditCardImage}
              alt={paymentMethods[selectedCard].cardHolder + "'s Card"}
              width={300}
            />

            <div className="grid gap-2">
              <Label htmlFor="name">Name on Card</Label>
              <Input
                id="name"
                type="name"
                placeholder={paymentMethods[selectedCard].cardHolder}
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4 ">
              <div className="grid gap-2">
                <Label htmlFor="month">Expires</Label>
                <Select>
                  <SelectTrigger id="month">
                    <SelectValue
                      placeholder={paymentMethods[selectedCard].expiryMonth}
                    />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">January</SelectItem>
                    <SelectItem value="2">February</SelectItem>
                    <SelectItem value="3">March</SelectItem>
                    <SelectItem value="4">April</SelectItem>
                    <SelectItem value="5">May</SelectItem>
                    <SelectItem value="6">June</SelectItem>
                    <SelectItem value="7">July</SelectItem>
                    <SelectItem value="8">August</SelectItem>
                    <SelectItem value="9">September</SelectItem>
                    <SelectItem value="10">October</SelectItem>
                    <SelectItem value="11">November</SelectItem>
                    <SelectItem value="12">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="year">Year</Label>
                <Select>
                  <SelectTrigger id="year">
                    <SelectValue
                      placeholder={paymentMethods[selectedCard].expiryYear}
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem
                        key={i}
                        value={`${new Date().getFullYear() + i}`}
                      >
                        {new Date().getFullYear() + i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button asChild className="mt-[22px]" variant={'outline'}>
                <Link
                  href={`/settings/edit/edit-payment-method?card-id=${paymentMethods[selectedCard].expiryYear}`}
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
