import { FC } from 'react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const NewPasswordForm = dynamic(() =>
  import('@/app/auth/_components/NewPasswordForm').then(
    (mod) => mod.NewPasswordForm
  )
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

      <NewPasswordForm />
    </>
  );
};

export default page;
