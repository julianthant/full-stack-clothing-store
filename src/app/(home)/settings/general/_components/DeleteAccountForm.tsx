'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/utils/Icons';
import { useTransition } from 'react';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const DeleteAccountForm = () => {
  const [isPending, startTransition] = useTransition();

  const SubmitDeleteAccount = async () => {
    const toast = (await import('@/components/ui/use-toast')).toast;

    const DeleteAccount = await import(
      '@/server/actions/general/delete-account'
    ).then((mod) => mod.DeleteAccount);

    startTransition(() => {
      DeleteAccount()
        .then((data) => {
          if (data.success) {
            toast({
              title: 'Permanent Account Deletion',
              description: 'Account has been successfully deleted!',
            });
          }

          if (data.error) {
            toast({
              title: 'Permanent Account Deletion',
              description: data.error,
              variant: 'destructive',
            });
          }
        })
        .catch((error) => {
          toast({
            title: 'Permanent Account Deletion',
            description: error,
            variant: 'destructive',
          });
        });
    });
  };

  return (
    <Card className="border-red-400">
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Permanently remove your Personal Account and all of its contents from
          the StyleZ platform. This action is not reversible, so please continue
          with caution.
        </CardDescription>
      </CardHeader>
      <CardFooter
        className={cn(
          'border-t border-red-400 px-6 py-3 bg-red-100 rounded-b-xl flex justify-end'
        )}
      >
        <form onSubmit={() => SubmitDeleteAccount()}>
          <Button disabled={isPending} type="submit" variant={'destructive'}>
            {isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Delete Personal Account
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
