import { SettingsDashboard } from '@/components/settings/SettingsDashboard';
import { getPaymentMethodsByUserId } from '@/data/payment-methods';
import { currentUser } from '@/lib/server-auth';

const page = async () => {
  const user = await currentUser();
  const paymentMethods = await getPaymentMethodsByUserId(user?.id as string);

  return <SettingsDashboard payment={paymentMethods} />;
};

export default page;
