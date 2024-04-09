'use client';

import * as z from 'zod';
import * as React from 'react';

import { NameSchema } from '@/schemas';
import { ChangeName } from '@/actions/accountProfile/change-name';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormError } from '../../../utils/FormError';
import { FormSuccess } from '../../../utils/Form.Success';

import { cn } from '@/lib/utils';
import { Icons } from '../../../utils/Icons';
import { Input } from '@nextui-org/react';
import { Button } from '../../../ui/button';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface NameEditProps extends React.HTMLAttributes<HTMLDivElement> {}

export function NameEditForm({ className, ...props }: NameEditProps) {
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NameSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      ChangeName(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className={cn('grid gap-6 w-[300px]', className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Change Name</h1>
        <p className="text-sm text-muted-foreground">Enter your new name</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="email">
                    Name
                  </FormLabel>

                  <FormControl>
                    <Input
                      key="inside"
                      {...field}
                      type="name"
                      variant="bordered"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      placeholder="John Doe"
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
              Set New Name
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
