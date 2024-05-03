import * as z from 'zod';

import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CardEditSchema } from '@/schemas';

import { zodResolver } from '@hookform/resolvers/zod';
import { RemovePaymentMethod } from '@/server/actions/accountPayments/remove-payment-method';
import { useTransition, useState } from 'react';

import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function PaymentMethodComponent({ paymentMethod, refetch }: any) {
  const [isPending, startTransition] = useTransition();
  const [wasDelete, setWasDelete] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof CardEditSchema>>({
    resolver: zodResolver(CardEditSchema),
    defaultValues: {
      cardHolder: paymentMethod?.cardHolder,
      expiryDate: `${paymentMethod?.expiryMonth} / ${paymentMethod?.expiryYear}`,
      defaultCard: paymentMethod?.defaultCard,
    },
  });

  const { mutateAsync: removePaymentMethod } = useMutation({
    mutationFn: () => RemovePaymentMethod(paymentMethod.id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });

      const toast = (await import('@/components/ui/use-toast')).toast;

      toast({
        duration: 5000,
        title: 'Payment Method: Remove',
        description: 'Payment method removed successfully!',
      });
    },
    onError: async () => {
      const toast = (await import('@/components/ui/use-toast')).toast;

      toast({
        duration: 5000,
        variant: 'destructive',
        title: 'Payment Method: Remove',
        description: 'Failed to remove payment method!',
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof CardEditSchema>) => {
    const toast = (await import('@/components/ui/use-toast')).toast;

    const UpdatePaymentMethod = await import(
      '@/server/actions/accountPayments/update-payment-method'
    ).then((mod) => mod.UpdatePaymentMethod);

    if (expiredDate(values.expiryDate)) {
      toast({
        title: 'Card Expiry',
        description: 'Your card has expired!',
      });

      return;
    }

    startTransition(() => {
      UpdatePaymentMethod(values, paymentMethod.id)
        .then((data) => {
          if (data.success) {
            toast({
              title: `Card Ending in **** ${paymentMethod.lastFourNumbers}`,
              description: 'Your card has been successfully updated!',
            });

            refetch();
          }

          if (data.error) {
            toast({
              title: `Card Ending in **** ${paymentMethod.lastFourNumbers}`,
              description: data.error,
              variant: 'destructive',
            });
          }
        })
        .catch((error) => {
          toast({
            title: `Card Ending in **** ${paymentMethod.lastFourNumbers}`,
            description: error,
            variant: 'destructive',
          });
        });
    });
  };

  const expiryDateFormatDeleted = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setWasDelete(event.key === 'Backspace');
  };

  const expiryDateFormat = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (value.length === 5 && wasDelete) {
      value = value.slice(0, -3);
    }

    if (value.length === 3 && !wasDelete) {
      value = value.slice(0, 2) + ' / ' + value.slice(2);
    }

    if (value.length === 1 && Number(value) > 1) {
      value = `0${value} / `;
    } else if (value.length === 2 && Number(value) > 12) {
      value = '01 / ';
    } else if (
      value.length === 2 &&
      Number(value) >= 10 &&
      Number(value) <= 12
    ) {
      value = `${value} / `;
    }

    event.target.value = value;

    setWasDelete(false);
  };

  const expiredDate = (expiryDate: string) => {
    if (expiryDate.length < 7) return false;

    const [expiryMonth, expiryYear] = expiryDate.split('/');

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const hasExpired =
      Number(expiryYear) <= Number(currentYear.toString().slice(2, 4)) &&
      Number(expiryMonth) < currentMonth;

    return hasExpired;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {paymentMethod.bankName} {paymentMethod.cardScheme}{' '}
          {paymentMethod.cardType} CARD
        </CardTitle>
        <CardDescription>
          Card ending in &#x2022;&#x2022;&#x2022;&#x2022;{' '}
          {paymentMethod.lastFourNumbers}
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex items-center justify-between gap-3">
            <FormField
              control={form.control}
              name="cardHolder"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel className={cn('font-light tracking-wider')}>
                    Card Holder
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className={cn('shadow-none')}
                      maxLength={32}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn('font-light tracking-wider')}>
                    Expires
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="MM/YY"
                      {...field}
                      className={cn('shadow-none', {
                        'text-red-400': expiredDate(field.value ?? ''),
                      })}
                      onInput={expiryDateFormat}
                      onKeyDown={expiryDateFormatDeleted}
                      maxLength={7}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between gap-2 border-t px-6 py-3">
            <CardDescription className="w-full">
              Your card will be permanently removed from your account.
            </CardDescription>
            <div className="flex items-center justify-end gap-3">
              <Button
                variant={'destructive'}
                onClick={() => removePaymentMethod()}
                type="button"
              >
                Remove
              </Button>

              <Button disabled={isPending} variant={'outline'} type="submit">
                {isPending && (
                  <Icons.spinner
                    className={cn('mr-2 h-4 w-4 animate-spin shadow-none')}
                  />
                )}
                Save
              </Button>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
