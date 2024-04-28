import { GeneralTab } from '../_components/GeneralTab';
import { currentUser } from '@/lib/server-auth';

const page = async () => {
  const user = await currentUser();

  return <GeneralTab user={user} />;
};

export default page;
