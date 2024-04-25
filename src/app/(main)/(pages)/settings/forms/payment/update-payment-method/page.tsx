import { FC } from 'react';
import { PaymentEditForm } from '../_components/PaymentEditForm';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>
      <PaymentEditForm />
    </div>
  );
};

export default page;
