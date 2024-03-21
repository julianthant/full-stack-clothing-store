import { LoginForm } from '@/components/auth/LoginForm';
import { FC } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <Link
        href="/auth/register"
        className={cn('absolute right-4 top-4 md:right-8 md:top-8')}
      >
        Register
      </Link>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to login
        </p>
      </div>
      <LoginForm />
    </>
  );
};

export default page;
