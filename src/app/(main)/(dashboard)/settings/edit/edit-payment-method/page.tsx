import { FC } from 'react';
import { PaymentEditForm } from '@/components/settings/account/forms/PaymentEditForm';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <PaymentEditForm />
    </div>
  );
};

export default page;
