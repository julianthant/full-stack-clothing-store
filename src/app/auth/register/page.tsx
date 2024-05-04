import { RegisterForm } from '@/app/auth/_components/RegisterForm';
import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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

      <RegisterForm />
    </>
  );
};

export default page;
