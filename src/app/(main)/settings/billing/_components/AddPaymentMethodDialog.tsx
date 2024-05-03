import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cardAddSchema } from '@/schemas';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useTransition } from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';
import { Divider } from '@nextui-org/react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function AddPaymentMethodDialog({ user, open, setOpen }: any) {
  const [isPending, startTransition] = useTransition();
  const [wasDelete, setWasDelete] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof cardAddSchema>>({
    resolver: zodResolver(cardAddSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      cardHolder: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof cardAddSchema>) => {
    const toast = (await import('@/components/ui/use-toast')).toast;

    const AddPaymentMethod = (
      await import('@/server/actions/accountPayments/add-payment-method')
    ).AddPaymentMethod;

    if (expiredDate(values.expiryDate)) {
      toast({
        title: 'Card Expiry',
        description: 'Your card has expired!',
      });

      return;
    }

    startTransition(() => {
      AddPaymentMethod(values)
        .then((data) => {
          if (data.success) {
            toast({
              title: 'Payment Method',
              description: 'Your card has been successfully added!',
            });
            queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
            setOpen(false);
          }

          if (data.error) {
            toast({
              title: 'Payment Method',
              description: data.error,
              variant: 'destructive',
            });
            setOpen(false);
          }
        })
        .catch((error) => {
          toast({
            title: 'Payment Method',
            description: error,
            variant: 'destructive',
          });
        })
        .finally(() => {
          form.reset();
        });
    });
  };

  const cardNumberFormat = (event: any) => {
    const cursorPosition = event.target.selectionStart;
    const value = event.target.value
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
    event.target.value = value;
    event.target.setSelectionRange(cursorPosition, cursorPosition);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="max-sm:hidden">Add new card</Button>
      </DialogTrigger>
      <DialogContent className={cn('px-0 pt-6 pb-0 gap-0 max-sm:hidden')}>
        <DialogHeader className="px-6 pb-6">
          <DialogTitle>Add a Card</DialogTitle>
          <DialogDescription>
            Add a payment method for{' '}
            <span className="font-bold">{user && user?.name}</span>
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex px-6 gap-6 pb-2">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem className="flex-grow w-full space-y-1.5">
                    <FormLabel className={cn('font-light tracking-wider')}>
                      Card Number
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="1234 1234 1234 1234"
                        {...field}
                        className={cn('shadow-none')}
                        onInput={cardNumberFormat}
                        maxLength={19}
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
                  <FormItem className="space-y-1.5">
                    <FormLabel className={cn('font-light tracking-wider')}>
                      Expires
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="MM/YY"
                        {...field}
                        className={cn('shadow-none', {
                          'text-red-400': expiredDate(field.value),
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

              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className={cn('font-light tracking-wider')}>
                      CVC
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="CVC"
                        {...field}
                        className={cn('shadow-none')}
                        maxLength={4}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="cardHolder"
              render={({ field }) => (
                <FormItem className="px-6 space-y-1.5 pb-7">
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

            <Divider className="h-[1px]" />

            <DialogFooter
              className={cn(
                'flex items-center justify-between w-full sm:justify-between px-6 py-4 bg-muted/50'
              )}
            >
              <Button
                variant={'outline'}
                className={cn('hover:bg-gray-100 shadow-none')}
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button disabled={isPending} type="submit">
                {isPending && (
                  <Icons.spinner
                    className={cn('mr-2 h-4 w-4 animate-spin shadow-none')}
                  />
                )}
                Continue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
