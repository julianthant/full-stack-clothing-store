'use client';

import { useCallback, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';
import { newEmailVerification } from '@/actions/new-email';

import { Spinner } from '@nextui-org/react';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/utils/FormError';
import { FormSuccess } from '@/components/utils/Form.Success';

import Link from 'next/link';

export const NewEmailVerification = () => {
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

    newEmailVerification(token)
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
    <div className="w-full">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          New Email Verifification
        </h1>
        <p className="text-sm text-muted-foreground">Verify your new email</p>
      </div>

      <div className="flex items-center justify-center">
        {!error && !success && <Spinner color="primary" className="my-4" />}
      </div>

      <FormSuccess message={success} />

      {!success && <FormError message={error} />}

      <Button className="w-full mt-2" asChild>
        <Link href="/settings">Back to Settings</Link>
      </Button>
    </div>
  );
};
