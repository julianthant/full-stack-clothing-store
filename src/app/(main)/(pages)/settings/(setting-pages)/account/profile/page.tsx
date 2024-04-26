import dynamic from 'next/dynamic';

import { format } from 'date-fns';
import { Divider } from '@nextui-org/divider';
import { Suspense } from 'react';
import { currentUser } from '@/lib/server-auth';

const EditUserComponent = dynamic(() =>
  import('@/components/utils/EditUserComponent').then((mod) => mod.default)
);

const page = async () => {
  const user = await currentUser();

  return (
    <div className="space-y-8">
      <div className="w-full rounded-lg border border-dashed shadow-sm p-8">
        <div className="space-y-4 tracking-wide">
          <Suspense fallback={<div>Loading...</div>}>
            <EditUserComponent
              Title="Name"
              Name={user?.name || 'N/A'}
              FormLink={'/settings/edit/change-name'}
            />
          </Suspense>

          <Divider />

          <Suspense fallback={<div>Loading...</div>}>
            <EditUserComponent
              Title="Country"
              Name={user?.country || 'N/A'}
              FormLink={'/settings/edit/change-country'}
            />
          </Suspense>

          <Divider />

          <Suspense fallback={<div>Loading...</div>}>
            <EditUserComponent
              Title="Date Of Birth"
              Name={
                (user?.dateOfBirth &&
                  format(user?.dateOfBirth, 'dd MMMM, yyy')) ||
                'N/A'
              }
              FormLink={'/settings/edit/date-of-birth'}
            />
          </Suspense>

          <Divider />

          <Suspense fallback={<div>Loading...</div>}>
            <EditUserComponent
              Title="Gender"
              Name={
                (user?.gender &&
                  user?.gender.charAt(0).toUpperCase() +
                    user?.gender.slice(1)) ||
                'N/A'
              }
              FormLink={'/settings/edit/gender'}
            />
          </Suspense>

          <Divider />

          <Suspense fallback={<div>Loading...</div>}>
            <EditUserComponent
              Title="Primary Mobile Number"
              Name={user?.phoneNumber || 'N/A'}
              FormLink={'/settings/edit/phone-number'}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
