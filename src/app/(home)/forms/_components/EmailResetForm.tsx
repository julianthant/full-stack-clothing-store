'use client';

import * as z from 'zod';

import { useForm } from 'react-hook-form';
import { EmailSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';

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

export function EmailResetForm({ UserEmail, UserIsOAuth }: any) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: UserEmail,
    },
  });

  const onSubmit = async (values: z.infer<typeof EmailSchema>) => {
    const toast = (await import('@/components/ui/use-toast')).toast;

    const SendEmailChangeToken = await import(
      '@/server/actions/accountSecurity/new-email'
    ).then((mod) => mod.SendEmailChangeToken);

    startTransition(() => {
      SendEmailChangeToken(values)
        .then((data) => {
          if (data.success) {
            toast({
              title: 'Email Change',
              description:
                'Your reset link has been successfully sent to your new email!',
            });
          }

          if (data.error) {
            toast({
              title: 'Email Change',
              description: data.error,
              variant: 'destructive',
            });
          }
        })
        .catch((error) => {
          toast({
            title: 'Email Change',
            description: error,
            variant: 'destructive',
          });
        });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email</CardTitle>
        <CardDescription>
          {UserIsOAuth
            ? 'OAuth users cannot change their email.'
            : 'Please enter the email address you want to change to.'}
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="email">
                    Email
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      placeholder="name@example.com"
                      disabled={isPending || UserIsOAuth}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between gap-2 border-t px-6 py-3">
            <CardDescription>
              {UserIsOAuth
                ? 'Unable to send verification link to OAuth users.'
                : 'A verification link will be sent to your new email address.'}
            </CardDescription>
            <Button disabled={isPending || UserIsOAuth} type="submit">
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Reset
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
