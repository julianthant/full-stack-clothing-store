'use client';

import * as z from 'zod';

import { useTransition } from 'react';
import { PasswordSchema } from '@/schemas';

import { Icons } from '@/components/utils/Icons';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function PasswordResetForm({ UserEmail, UserIsOAuth }: any) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof PasswordSchema>) => {
    const toast = (await import('@/components/ui/use-toast')).toast;

    const SendPasswordResetToken = await import(
      '@/server/actions/login-register-auth/new-password'
    ).then((mod) => mod.SendPasswordResetToken);

    startTransition(() => {
      SendPasswordResetToken({ email: UserEmail })
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
        <CardTitle>Password</CardTitle>
        <CardDescription>
          {UserIsOAuth
            ? 'OAuth users cannot change their password.'
            : 'Please click the button below to send a password reset link to your email address.'}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between gap-2 border-t px-6 py-3">
        <CardDescription>
          {UserIsOAuth
            ? 'Unable to send password reset link to OAuth users.'
            : 'A password reset link will be sent to your email address.'}
        </CardDescription>
        <Button disabled={isPending || UserIsOAuth} type="submit">
          {isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
