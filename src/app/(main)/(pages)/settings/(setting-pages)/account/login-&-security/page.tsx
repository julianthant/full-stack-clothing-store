import dynamic from 'next/dynamic';

import { Button } from '@/components/ui/button';
import { Divider } from '@nextui-org/divider';
import { currentUser } from '@/lib/server-auth';
import { UserEditFormSkeleton } from '@/components/skeleton/UserEditFormsSkeleton';

const EditUserComponent = dynamic(
  () =>
    import('@/components/utils/EditUserComponent').then((mod) => mod.default),
  { loading: () => <UserEditFormSkeleton /> }
);

const page = async () => {
  const user = await currentUser();

  return (
    <div className="w-full rounded-lg border border-dashed shadow-sm p-8 h-[312px]">
      <div className="space-y-4">
        <EditUserComponent
          Title="Email"
          Name={user?.email || 'N/A'}
          FormLink={'/settings/edit/new-email'}
          ShowEdit={!user?.isOAuth}
        />

        <Divider />

        <EditUserComponent
          Title="Password"
          Name={user?.isOAuth ? 'N/A' : '********'}
          FormLink={'/settings/edit/reset-password'}
          ShowEdit={!user?.isOAuth}
        />

        <Divider />

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
      </div>
    </div>
  );
};

export default page;
