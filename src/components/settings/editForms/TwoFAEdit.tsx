'use client';

import * as z from 'zod';
import * as React from 'react';

import { TwoFASchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormError } from '../../utils/FormError';
import { FormSuccess } from '../../utils/Form.Success';
import { Validate2FACode } from '@/actions/activate-2fa';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Icons } from '../../utils/Icons';
import { Button } from '../../ui/button';
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
import { sendTwoFactorActivationCode } from '@/actions/send-code';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { ToastContainer, toast } from 'react-toastify';

interface TwoFAEditProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TwoFAEdit({ className, ...props }: TwoFAEditProps) {
  const [error, setError] = React.useState<string | undefined>('');
  const [success, setSuccess] = React.useState<string | undefined>('');
  const [formError, setFormError] = React.useState<string | undefined>('');

  const [isPending, startTransition] = React.useTransition();

  const searchParams = useSearchParams();
  let formType = searchParams.get('type');

  const user = useCurrentUser();

  React.useEffect(() => {
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
    setError('');
    setSuccess('');

    startTransition(() => {
      Validate2FACode(values, formType as string).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <div className={cn('grid w-[300px]', className)} {...props}>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />

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

                <FormError message={error || formError} />
                <FormSuccess message={success} />

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
                .then(() =>
                  toast.success('Verification code sent!', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'colored',
                  })
                )
                .catch(() =>
                  toast.error('Failed to send code!', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: 'colored',
                  })
                );
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
