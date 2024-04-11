'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useTransition, HTMLAttributes } from 'react';

import { toast } from 'react-toastify';
import { TwoFASchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendTwoFactorActivationCode } from '@/actions/authentication/send-code';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Validate2FACode } from '@/actions/accountSecurity/activate-2fa';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Icons } from '../../../utils/Icons';
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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

interface TwoFAEditProps extends HTMLAttributes<HTMLDivElement> {}

export function TwoFAForm({ className, ...props }: TwoFAEditProps) {
  const [formError, setFormError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  let formType = searchParams.get('type');

  const user = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (formType !== 'activate' && formType !== 'deactivate') {
      setFormError('Invalid form type');
    }
  }, [formType]);

  const form = useForm<z.infer<typeof TwoFASchema>>({
    resolver: zodResolver(TwoFASchema),
    defaultValues: {
      code: '',
    },
  });

  const onSubmit = (values: z.infer<typeof TwoFASchema>) => {
    startTransition(() => {
      Validate2FACode(values, formType as string).then((data) => {
        if (!data) {
          router.push(
            '/settings/?menu=Account&subMenu=Profile&success=true&message=' +
              encodeURIComponent('Unable to validate 2FA Code')
          );
          return;
        }

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
    <div className={cn('grid w-[300px]', className)} {...props}>
      <div className="grid gap-6">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Two Factor Authentication
          </h1>
          {formType === 'activate' && (
            <p className="text-sm text-muted-foreground">
              Enter the activation code in your email
            </p>
          )}
          {formType === 'deactivate' && (
            <p className="text-sm text-muted-foreground">
              Enter the deactivation code in your email
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          <InputOTP
                            {...field}
                            disabled={isPending || !!formError}
                            maxLength={6}
                          >
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

                <Button
                  disabled={isPending || !!formError}
                  className="w-full"
                  type="submit"
                >
                  {isPending && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {formType === 'activate' ? 'Activate' : 'Deactivate'}
                </Button>
              </div>
            </form>
          </Form>
          <form
            className=""
            onSubmit={async (event) => {
              event.preventDefault();
              await sendTwoFactorActivationCode(user?.email as string)
                .then(() => toast.success('Verification code sent!'))
                .catch(() => toast.error('Failed to send code!'));
            }}
          >
            <Button
              className="font-semibold w-full"
              type="submit"
              variant="secondary"
            >
              Resend Code
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
