'use client';

import Link from 'next/link';

import { FC } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorFormProps {}

const ErrorForm: FC<ErrorFormProps> = ({}) => {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Error</h1>
        <p className="text-sm text-muted-foreground">Something went wrong</p>
      </div>

      <Button asChild>
        <Link href="/auth/login">Back to Login</Link>
      </Button>
    </>
  );
};

export default ErrorForm;
