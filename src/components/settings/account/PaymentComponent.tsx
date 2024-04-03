import { useState, useEffect } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { CardEditSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export const PaymentComponent = () => {
  const user = useCurrentUser();

  const [selectedCard, setSelectedCard] = useState(0);

  const cards = [
    {
      Cardholder: 'Julian Hein',
      BankName: 'Bank of America Visa Debit Card',
      Number: '7037',
      Expiry: '12/2024',
      Image: CreditCardImage,
    },
    {
      Cardholder: 'Eric Dong',
      BankName: 'Bank of America Visa Credit Card',
      Number: '9023',
      Expiry: '2/2025',
      Image: CreditCardImage,
    },
    {
      Cardholder: 'Shwe Kyone',
      BankName: 'Bank of America Visa Debit Card',
      Number: '3453',
      Expiry: '3/2027',
      Image: CreditCardImage,
    },
  ];

  const form = useForm<z.infer<typeof CardEditSchema>>({
    resolver: zodResolver(CardEditSchema),
  });

  const onSubmit = (values: z.infer<typeof CardEditSchema>) => {
    console.log(values);
  };

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

        <CardContent className="grid gap-3">
          <Image
            src={cards[selectedCard].Image}
            alt={cards[selectedCard].Cardholder + "'s Card"}
            width={300}
          />

          <Form {...form}>
            <form className="space-y-1" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>

                    <Input
                      id="name"
                      type="name"
                      onChange={field.onChange}
                      placeholder={cards[selectedCard].Cardholder}
                      required
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="expiry_month"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="month">Expires</Label>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={cards[selectedCard].Expiry.split('/')[0]}
                      >
                        <FormControl>
                          <SelectTrigger id="month">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                        </FormControl>

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

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiry_year"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="year">Year</Label>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={cards[selectedCard].Expiry.split('/')[1]}
                      >
                        <FormControl>
                          <SelectTrigger id="year">
                            <SelectValue placeholder="Year" />
                          </SelectTrigger>
                        </FormControl>

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

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-[32px]">
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
