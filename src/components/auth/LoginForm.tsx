'use client';

import * as z from 'zod';
import * as React from 'react';

import Link from 'next/link';
import { Link as NextLink } from '@nextui-org/link';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';

import { Login } from '@/server/actions/authentication/login';
import { SignIn } from '@/server/actions/authentication/oauth-login';
import { LoginSchema } from '@/schemas';

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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');

  const [isVisible, setIsVisible] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const [showTwoFactor, setShowTwoFactor] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'An account with the same email already exists!'
      : '';

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      Login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError('Something went wrong!'));
    });
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      {showTwoFactor ? (
        <Link
          href="/auth/login"
          className={cn('absolute right-4 top-4 md:right-8 md:top-8')}
        >
          Login
        </Link>
      ) : (
        <Link
          href="/auth/register"
          className={cn('absolute right-4 top-4 md:right-8 md:top-8')}
        >
          Register
        </Link>
      )}

      {showTwoFactor ? (
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Two Factor Authentication
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your 2FA code to login
          </p>
        </div>
      ) : (
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password to login
          </p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {showTwoFactor ? (
            <div className="space-y-5">
              <div className="flex items-center justify-center">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only" htmlFor="code">
                        OTP Code
                      </FormLabel>

                      <FormControl>
                        <InputOTP {...field} disabled={isPending} maxLength={6}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormError message={error} />

              <Button
                disabled={isPending}
                className="mt-1 w-full"
                type="submit"
              >
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </div>
          ) : (
            <div className="grid">
              <div className="grid gap-2">
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
              </div>

              <FormError message={error || urlError} />
              <FormSuccess message={success} />

              <NextLink
                href="/auth/reset"
                size="sm"
                className="text-blue-700 text-center ml-auto mt-2 mb-3"
                underline="hover"
              >
                Forgot Password?
              </NextLink>

              <Button disabled={isPending} className="mt-1 h-10" type="submit">
                {isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          )}
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          type="button"
          disabled={isPending}
          className="w-full h-10"
          onClick={() => {
            startTransition(() => {
              SignIn('google');
            });
          }}
        >
          {isPending ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google />
          )}{' '}
          Google
        </Button>

        <Button
          variant="outline"
          type="button"
          disabled={isPending}
          className="w-full h-10"
          onClick={() => {
            startTransition(() => {
              SignIn('facebook');
            });
          }}
        >
          {isPending ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.facebook />
          )}{' '}
          Facebook
        </Button>
      </div>
    </div>
  );
}
