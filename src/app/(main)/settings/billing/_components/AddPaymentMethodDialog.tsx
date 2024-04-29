import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { cardAddSchema } from '@/schemas';
import { AddPaymentMethod } from '@/server/actions/accountPayments/add-payment-method';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

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

import { Divider } from '@nextui-org/react';

export function AddPaymentMethodDialog({ user }: any) {
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof cardAddSchema>>({
    resolver: zodResolver(cardAddSchema),
  });

  const onSubmit = (values: z.infer<typeof cardAddSchema>) => {
    startTransition(() => {
      AddPaymentMethod(values)
        .then((data) => {
          if (data.success) {
            toast({
              title: 'Name Change',
              description: 'Your name has been successfully changed!',
            });
          }

          if (data.error) {
            toast({
              title: 'Name Change',
              description: data.error,
            });
          }
        })
        .catch((error) => {
          toast({
            title: 'Name Change',
            description: error,
          });
        });
    });
  };

  const handleInputChange = (event: any) => {
    const value = event.target.value
      .replace(/\s/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
    event.target.value = value;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add new card</Button>
      </DialogTrigger>
      <DialogContent className={cn('px-0 pt-6 pb-0 gap-0')}>
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
                        onInput={handleInputChange}
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
                        className={cn('shadow-none')}
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
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

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
      </DialogContent>
    </Dialog>
  );
}
