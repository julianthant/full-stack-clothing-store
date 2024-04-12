import { toast } from 'react-toastify';
import { Divider } from '@nextui-org/react';

import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { sendTwoFactorActivationCode } from '@/actions/authentication/send-code';

import EditUserComponent from '@/components/utils/EditUserComponent';

export const AccountComponent = () => {
  const user = useCurrentUser();
  const router = useRouter();

  return (
    <div className="w-full rounded-lg border border-dashed shadow-sm p-8">
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
          FormLink={''}
          ShowEdit={false}
          CustomEdit={
            <form
              className="ml-auto"
              onSubmit={async (event) => {
                event.preventDefault();

                if (!user?.is2FAEnabled) {
                  await sendTwoFactorActivationCode(user?.email as string)
                    .then(() =>
                      router.push(
                        '/settings/edit/two-factor-authentication?type=activate'
                      )
                    )
                    .catch(() => {
                      toast.error('Failed to send code');
                    });
                } else if (user?.is2FAEnabled) {
                  await sendTwoFactorActivationCode(user?.email as string)
                    .then(() =>
                      router.push(
                        '/settings/edit/two-factor-authentication?type=deactivate'
                      )
                    )
                    .catch(() => {
                      toast.error('Failed to send code');
                    });
                }
              }}
            >
              <button
                className="font-semibold ml-auto text-green-600"
                type="submit"
              >
                {user?.is2FAEnabled ? 'Turn off' : 'Turn on'}
              </button>
            </form>
          }
        />
      </div>
    </div>
  );
};
