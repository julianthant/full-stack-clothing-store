'use client';

import * as z from 'zod';
import * as React from 'react';

import { EmailSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendEmailResetToken } from '@/server/actions/security/new-email';

import { FormError } from '@/components/utils/FormError';
import { FormSuccess } from '@/components/utils/Form.Success';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/utils/Icons';
import { Input } from '@nextui-org/react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface ResetFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function EmailResetForm({ className, ...props }: ResetFormProps) {
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof EmailSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      SendEmailResetToken(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset Password
        </h1>
        <p className="text-sm text-muted-foreground">Forgot your password?</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-1">
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
                      key="inside"
                      {...field}
                      type="email"
                      variant="bordered"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      placeholder="name@example.com"
                      radius="sm"
                      disabled={isPending}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button disabled={isPending} className="mt-2" type="submit">
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send Reset Email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
