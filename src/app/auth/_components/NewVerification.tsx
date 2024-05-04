'use client';

import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/server/actions/authentication/new-verification';
import { useCallback, useEffect, useState } from 'react';

import { Spinner } from '@nextui-org/react';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/utils/FormError';
import { FormSuccess } from '@/components/utils/Form.Success';

import Link from 'next/link';

export const EmailVerification = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Token is missing!');
      return;
    }

    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Email Verifification
        </h1>
        <p className="text-sm text-muted-foreground">Verify your email</p>
      </div>

      {!error && !success && <Spinner color="primary" />}

      <FormSuccess message={success} />

      {!success && <FormError message={error} />}

      <Button asChild>
        <Link href="/auth/login">Back to Login</Link>
      </Button>
    </>
  );
};
