import dynamic from 'next/dynamic';

const ErrorForm = dynamic(() =>
  import('@/app/auth/_components/ErrorForm').then((mod) => mod.default)
);
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return <ErrorForm />;
};

export default page;
