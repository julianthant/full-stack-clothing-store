'use client';

import * as z from 'zod';
import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardEditSchema } from '@/schemas';

import { FormError } from '@/components/utils/FormError';
import { FormSuccess } from '@/components/utils/Form.Success';

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';
import { Spinner } from '@nextui-org/react';
import { Checkbox } from '@/components/ui/checkbox';

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

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getPaymentMethodById } from '@/actions/get-payment-method';
import { UpdatePaymentMethod } from '@/actions/accountPayments/update-payment-method';

export function PaymentEditForm() {
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('card-id');

  const [card, setCard] = React.useState<
    | {
        id: string;
        userId: string;
        bankName: string;
        cardType: string;
        cardScheme: string;
        cardHolder: string;
        cardNumber: string;
        lastFourNumbers: string;
        expiryMonth: string;
        expiryYear: string;
        cvc: string;
        default: boolean;
      }
    | null
    | undefined
  >();

  useEffect(() => {
    (async () => {
      try {
        const card = await getPaymentMethodById(id as string);
        setCard(card);
      } catch {
        setError('Failed to fetch card details');
      }
    })();
  }, [id]);

  const form = useForm<z.infer<typeof CardEditSchema>>({
    resolver: zodResolver(CardEditSchema),
  });

  useEffect(() => {
    if (!!card) {
      form.reset({
        cardHolder: card?.cardHolder,
        expiryMonth: card?.expiryMonth,
        expiryYear: card?.expiryYear,
        defaultCard: card?.default,
      });
    }
  }, [card, form]);

  const [isPending, startTransition] = React.useTransition();

  const onSubmit = (values: z.infer<typeof CardEditSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      UpdatePaymentMethod(values, id as string).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  useEffect(() => {
    if (!!success) {
      const successMessage = encodeURI('Payment method updated successfully');
      router.push(
        '/settings/?menu=Account&subMenu=Payments&success=true&message=' +
          successMessage
      );
    }

    if (!!error) {
      const errorMessage = encodeURI('Unable to update payment method');
      router.push(
        '/settings/?menu=Account&subMenu=Payments&success=false&message=' +
          errorMessage
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error]);

  return (
    <Card className="border-0 shadow-none p-0 w-full">
      <CardHeader>
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Edit Payment Method
          </h1>
          <p className="text-sm text-muted-foreground">
            Update your details below
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        {!!card && (
          <Form {...form}>
            <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="cardHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name on Card</FormLabel>
                    <Input
                      id="name"
                      defaultValue={card?.cardHolder}
                      onChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4 pb-2">
                <FormField
                  control={form.control}
                  name="expiryMonth"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="month">Expires</Label>

                      <Select
                        onValueChange={field.onChange}
                        disabled={isPending}
                        defaultValue={card?.expiryMonth}
                      >
                        <FormControl>
                          <SelectTrigger id="month">
                            <SelectValue defaultValue={card?.expiryMonth} />
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
                  name="expiryYear"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="year">Year</Label>

                      <Select
                        onValueChange={field.onChange}
                        disabled={isPending}
                        defaultValue={card?.expiryYear}
                      >
                        <FormControl>
                          <SelectTrigger id="year">
                            <SelectValue defaultValue={card?.expiryYear} />
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
              </div>

              <FormField
                control={form.control}
                name="defaultCard"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 pb-1">
                    <FormLabel className="sr-only" htmlFor="default-payment">
                      Default Payment
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        className="mr-0"
                        id="defaultCard"
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                        checked={field.value}
                        defaultChecked={card?.default}
                      />
                    </FormControl>

                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Set as default payment method
                    </label>
                  </FormItem>
                )}
              />

              <FormError message={error} />
              <FormSuccess message={success} />

              <div className="pt-1">
                <Button disabled={isPending} className="w-full" type="submit">
                  {isPending && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Payment Method
                </Button>
              </div>
            </form>
          </Form>
        )}

        {!card && <Spinner color="primary" className="my-4" />}
      </CardContent>
    </Card>
  );
}
