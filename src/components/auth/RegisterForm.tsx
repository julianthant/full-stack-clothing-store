'use client';

import * as z from 'zod';
import * as React from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Register } from '@/server/actions/authentication/register';
import { RegisterSchema } from '@/schemas';

import { FormError } from '../utils/FormError';
import { FormSuccess } from '../utils/Form.Success';

import { cn } from '@/lib/utils';
import { Icons } from '../utils/Icons';
import { Button } from '../ui/button';
import { Input } from '../ui/Input';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const [isPending, startTransition] = React.useTransition();
  const [isVisible, setIsVisible] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const toggleVisibility = () => setIsVisible(!isVisible);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      Register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="name">
                    Name
                  </FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type="name"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      placeholder="name@example.com"
                      disabled={isPending}
                      className="shadow-none text-base h-10"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
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
                      disabled={isPending}
                      className="shadow-none text-base h-10"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only" htmlFor="password">
                    Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        type={isVisible ? 'text' : 'password'}
                        autoCapitalize="none"
                        autoComplete="Password"
                        autoCorrect="off"
                        disabled={isPending}
                        placeholder="password"
                        className="shadow-none text-base h-10"
                      />
                    </FormControl>

                    <button
                      className="absolute top-0 right-0 h-full flex items-center pr-3 focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <Icons.eyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <Icons.eyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />

            <Button disabled={isPending} className="mt-5" type="submit">
              {isPending && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up with Email
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
