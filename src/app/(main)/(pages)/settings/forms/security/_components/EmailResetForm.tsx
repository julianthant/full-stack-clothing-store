'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useTransition, HTMLAttributes } from 'react';

import { EmailSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { Input } from '@nextui-org/react';
import { Icons } from '@/components/utils/Icons';
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
import { newEmailToken } from '@/server/actions/accountSecurity/new-email';

interface EmailEditProps extends HTMLAttributes<HTMLDivElement> {}

export function EmailResetForm({ className, ...props }: EmailEditProps) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: z.infer<typeof EmailSchema>) => {
    startTransition(() => {
      newEmailToken(values).then((data) => {
        if (data.success) {
          router.push(
            '/settings/?menu=Account&subMenu=Profile&success=true&message=' +
              encodeURIComponent(data.success)
          );
        }

        if (data.error) {
          router.push(
            '/settings/?menu=Account&subMenu=Profile&success=false&message=' +
              encodeURIComponent(data.error)
          );
        }
      });
    });
  };

  return (
    <div className={cn('grid gap-6 w-[300px]', className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Reset Email</h1>
        <p className="text-sm text-muted-foreground">Need new email?</p>
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