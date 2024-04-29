import { currentUser } from '@/lib/server-auth';
import { AddPaymentMethodComponent } from './_components/AddPaymentMethodComponent';

const page = async () => {
  const user = await currentUser();

  return <AddPaymentMethodComponent user={user} />;
};

export default page;
