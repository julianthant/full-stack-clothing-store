import { SettingsDashboard } from '@/components/settings/SettingsDashboard';
import { currentUser } from '@/lib/server-auth';

const page = async () => {
  const user = await currentUser();

  return <SettingsDashboard />;
};

export default page;
