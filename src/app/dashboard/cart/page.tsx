import { FC } from 'react';
import { auth } from '@/lib/authentication/auth';

interface cartProps {}

const cart: FC<cartProps> = async ({}) => {
  const session = await auth();
  return <div>{JSON.stringify(session)}</div>;
};

export default cart;
