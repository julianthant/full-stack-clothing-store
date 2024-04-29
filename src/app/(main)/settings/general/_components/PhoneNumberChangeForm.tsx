'use client';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { PhoneNumberSchema } from '@/schemas';

import { Icons } from '@/components/utils/Icons';
import { Input } from '@/components/ui/Input';
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

export function PhoneNumberChangeForm({ UserPhoneNumber }: any) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PhoneNumberSchema>>({
    resolver: zodResolver(PhoneNumberSchema),
    defaultValues: {
      number: UserPhoneNumber,
    },
  });

  const onSubmit = async (values: z.infer<typeof PhoneNumberSchema>) => {
    const toast = (await import('@/components/ui/use-toast')).toast;

    const ChangePhoneNumber = await import(
      '@/server/actions/accountProfile/change-phone-number'
    ).then((mod) => mod.ChangePhoneNumber);

    startTransition(() => {
      ChangePhoneNumber(values)
        .then((data) => {
          if (data.success) {
            toast({
              title: 'Phone Number Change',
              description: 'Your phone number has been successfully changed',
            });
          }

          if (data.error) {
            toast({
              title: 'Phone Number Change',
              description: data.error,
              variant: 'destructive',
            });
          }
        })
        .catch((error) => {
          toast({
            title: 'Phone Number Change',
            description: error,
            variant: 'destructive',
          });
        });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Primary Mobile Number</CardTitle>
        <CardDescription>
          Please enter your current mobile number.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="number">
                    Phone Number
                  </FormLabel>

                  <FormControl>
                    <Input
                      key="inside"
                      {...field}
                      autoComplete="phone-number"
                      autoCorrect="off"
                      placeholder="+1 (000)-000-0000"
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between gap-2 border-t px-6 py-3">
            <CardDescription>
              Please provide your phone number along with your country code.
            </CardDescription>
            <Button disabled={isPending} type="submit">
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
