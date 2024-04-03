import { useState } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';

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
import CreditCardImage from '../../images/credit-card-example.png';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const PaymentComponent = () => {
  const user = useCurrentUser();

  const [selectedCard, setSelectedCard] = useState(0);

  const cards = [
    {
      Cardholder: 'Julian Hein',
      BankName: 'Bank of America Visa Debit Card',
      Number: '7037',
      Image: CreditCardImage,
    },
    {
      Cardholder: 'Eric Dong',
      BankName: 'Bank of America Visa Credit Card',
      Number: '9023',
      Image: CreditCardImage,
    },
    {
      Cardholder: 'Shwe Kyone',
      BankName: 'Bank of America Visa Debit Card',
      Number: '3453',
      Image: CreditCardImage,
    },
  ];

  return (
    <div className="sm:flex grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Wallet</CardTitle>
          <CardDescription>Cards & Accounts</CardDescription>
        </CardHeader>
        <CardContent className="grid bg-foreground-100 p-0 rounded-b-lg">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => setSelectedCard(index)}
              className={cn(
                'hover:cursor-pointer hover:bg-foreground-200',
                selectedCard === index && 'bg-foreground-200'
              )}
            >
              <div className="flex w-[320px] items-center justify-center px-6 py-4 gap-3">
                <Image
                  src={card.Image}
                  className="aspect-auto"
                  alt="Credit Card"
                  width={95}
                />
                <div className=" rounded-lg">
                  <h3 className={`${roboto.className} font-bold text-sm`}>
                    {card.BankName}
                  </h3>
                  <p className="text-xs">Card ending in **** {card.Number}</p>
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

      <Card className="h-full">
        <CardHeader>
          <CardTitle>{cards[selectedCard].Cardholder}&apos;s</CardTitle>
          <CardDescription>{cards[selectedCard].BankName}</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <Image
            src={cards[selectedCard].Image}
            alt={cards[selectedCard].Cardholder + "'s Card"}
            width={300}
          />

          <div className="grid gap-2">
            <Label htmlFor="name">Name on Card</Label>
            <Input id="name" type="name" placeholder="John Doe" required />
          </div>

          <div className="grid grid-cols-3 gap-4 place-items-center">
            <div className="grid gap-2">
              <Label htmlFor="month">Expires</Label>
              <Select>
                <SelectTrigger id="month">
                  <SelectValue placeholder="Month" />
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
                  <SelectValue placeholder="Year" />
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

            <Button className="w-20 mt-[22px]">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
