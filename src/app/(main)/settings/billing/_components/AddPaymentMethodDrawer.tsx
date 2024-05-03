import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cardAddSchema } from '@/schemas';
import { useState, useTransition, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';
import { Divider } from '@nextui-org/react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function AddPaymentMethodDrawer({ user, open, setOpen }: any) {
  const [isPending, startTransition] = useTransition();
  const [drawerStyle, setDrawerStyle] = useState({});
  const [key, setKey] = useState('');

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
    setKey(event.key);
  };

  const expiryDateFormat = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    const wasDelete = key === 'Backspace';
    const wasSlash = key === '/';
    const lastChar = value.slice(-1);

    // If the last character is not a number or a slash, remove it
    if (
      !/^\d$/.test(lastChar) ||
      (lastChar === '/' && (value.length !== 2 || wasDelete))
    ) {
      value = value.slice(0, -1);
    }

    if (value.length === 4) {
      value = value.slice(0, 2);
    }

    if (value.length === 3 && wasDelete) {
      value = value.slice(0, 2);
    }

    if (value.length === 3 && !wasDelete && !wasSlash) {
      value = value.slice(0, 2) + ' / ' + value.slice(2);
    }

    if (value.length === 2 && wasSlash) {
      value = value.slice(0, 2) + ' / ';
    }

    if (value.length === 1 && Number(value) > 1) {
      value = `0${value} / `;
    } else if (value.length === 2 && Number(value) > 12) {
      value = '01 / ';
    } else if (
      value.length === 2 &&
      Number(value) >= 10 &&
      Number(value) <= 12 &&
      !wasDelete
    ) {
      value = `${value.slice(0, 2)} / `;
    }

    event.target.value = value;
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

  useEffect(() => {
    const handleResize = () => {
      const drawerContent = document.getElementById('drawer-content');
      if (drawerContent) {
        const viewportHeight = window.innerHeight;
        const drawerHeight = drawerContent.offsetHeight;
        const bottomSpace = viewportHeight - drawerHeight;
        setDrawerStyle({ bottom: bottomSpace > 0 ? '0' : `${bottomSpace}px` });
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="sm:hidden">Add new card</Button>
      </DrawerTrigger>
      <DrawerContent
        className={cn('px-0 pt-6 pb-0 gap-0 sm:hidden')}
        id="drawer-content"
        style={drawerStyle}
      >
        <DrawerHeader className="px-6 pb-6">
          <DrawerTitle>Add a Card</DrawerTitle>
          <DrawerDescription>
            Add a payment method for{' '}
            <span className="font-bold">{user && user?.name}</span>
          </DrawerDescription>
        </DrawerHeader>

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
                        placeholder="MM / YY"
                        {...field}
                        className={cn('shadow-none', {
                          'text-red-400': expiredDate(field.value),
                        })}
                        onInput={expiryDateFormat}
                        maxLength={7}
                        onKeyDown={expiryDateFormatDeleted}
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

            <DrawerFooter
              className={cn(
                'flex items-center justify-between w-full sm:justify-between px-6 py-4 bg-muted/50 flex-row'
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
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
