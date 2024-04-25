import { FC } from 'react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const ResetForm = dynamic(() =>
  import('@/components/auth/ResetForm').then((mod) => mod.ResetForm)
);

import Link from 'next/link';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <Link
        href="/auth/login"
        className={cn('absolute right-4 top-4 md:right-8 md:top-8')}
      >
        Login
      </Link>

      <ResetForm />
    </>
  );
};

export default page;
