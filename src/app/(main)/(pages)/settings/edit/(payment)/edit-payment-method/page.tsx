import { FC } from 'react';
import { PaymentEditForm } from '@/app/(main)/(pages)/settings/(setting-pages)/account/payments/_components/PaymentEditForm';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <PaymentEditForm />
    </div>
  );
};

export default page;
