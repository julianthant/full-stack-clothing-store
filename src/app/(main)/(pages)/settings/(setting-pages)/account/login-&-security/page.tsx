import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import { Divider } from '@nextui-org/divider';
import { Suspense } from 'react';
import { currentUser } from '@/lib/server-auth';

const EditUserComponent = dynamic(() =>
  import('@/components/utils/EditUserComponent').then((mod) => mod.default)
);

const page = async () => {
  const user = await currentUser();

  return (
    <div className="w-full rounded-lg border border-dashed shadow-sm p-8">
      <div className="space-y-4">
        <Suspense fallback={<div>Loading...</div>}>
          <EditUserComponent
            Title="Email"
            Name={user?.email || 'N/A'}
            FormLink={'/settings/edit/new-email'}
            ShowEdit={!user?.isOAuth}
          />
        </Suspense>

        <Divider />

        <Suspense fallback={<div>Loading...</div>}>
          <EditUserComponent
            Title="Password"
            Name={user?.isOAuth ? 'N/A' : '********'}
            FormLink={'/settings/edit/reset-password'}
            ShowEdit={!user?.isOAuth}
          />
        </Suspense>

        <Divider />

        <Suspense fallback={<div>Loading...</div>}>
          <EditUserComponent
            Title="Two Factor Authentication"
            Name={user?.is2FAEnabled ? 'Enabled' : 'Disabled'}
            FormLink={
              user?.is2FAEnabled
                ? '/settings/edit/two-factor-authentication?type=deactivate'
                : '/settings/edit/two-factor-authentication?type=activate'
            }
            ShowEdit={false}
            CustomEdit={
              <Button
                className="font-semibold ml-auto text-green-600"
                type="submit"
                variant={'link'}
              >
                {user?.is2FAEnabled ? 'Turn off' : 'Turn on'}
              </Button>
            }
          />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
