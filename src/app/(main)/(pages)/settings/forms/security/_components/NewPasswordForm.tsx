'use client';

import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition, HTMLAttributes } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { newPassword } from '@/server/actions/accountSecurity/new-password';
import { NewPasswordSchema } from '@/schemas';

import { cn } from '@/lib/utils';
import { Input } from '@nextui-org/react';
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

interface NewPasswordProps extends HTMLAttributes<HTMLDivElement> {}

export function NewPasswordForm({ className, ...props }: NewPasswordProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    if (!token) {
      router.push(
        '/settings/?menu=Account&subMenu=Profile&success=true&message=' +
          encodeURIComponent('Token is missing')
      );
      return;
    }

    startTransition(() => {
      newPassword(values, token).then((data) => {
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
        <h1 className="text-2xl font-semibold tracking-tight">New Password</h1>
        <p className="text-sm text-muted-foreground">Enter your new password</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-1">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="password">
                    Password
                  </FormLabel>

                  <FormControl>
                    <Input
                      key="inside"
                      {...field}
                      type={isVisible ? 'text' : 'password'}
                      variant="bordered"
                      autoCapitalize="none"
                      autoComplete="new-password"
                      autoCorrect="off"
                      disabled={isPending}
                      placeholder="New Password"
                      radius="sm"
                      endContent={
                        <button
                          className="focus:outline-none"
                          type="button"
                          onClick={toggleVisibility}
                        >
                          {isVisible ? (
                            <Icons.eyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <Icons.eyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
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
              Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
