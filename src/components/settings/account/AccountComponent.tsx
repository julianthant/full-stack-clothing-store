import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { sendTwoFactorActivationCode } from '@/actions/authentication/send-code';

import { Divider } from '@nextui-org/react';
import { Skeleton } from '@nextui-org/react';
import { ToastContainer, toast } from 'react-toastify';

export const AccountComponent = () => {
  const user = useCurrentUser();
  const router = useRouter();

  return (
    <div className="w-full rounded-lg border border-dashed shadow-sm p-8">
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex">
            <Skeleton className="pr-4 rounded-lg h-6" isLoaded={!!user}>
              <h3 className="font-semibold">Name</h3>
            </Skeleton>

            <Link
              href={'/settings/edit/new-name'}
              className="font-semibold ml-auto text-green-600"
            >
              Edit
            </Link>
          </div>

          <Skeleton className="w-1/3 rounded-lg h-6" isLoaded={!!user}>
            <p>{user?.name}</p>
          </Skeleton>
        </div>

        <Divider />

        <div className="space-y-2">
          <div className="flex">
            <Skeleton className="pr-4 rounded-lg h-6" isLoaded={!!user}>
              <h3 className="font-semibold">Email</h3>
            </Skeleton>

            {!user?.isOAuth && (
              <Link
                href={'/settings/edit/new-email'}
                className="font-semibold ml-auto text-green-600"
              >
                Edit
              </Link>
            )}
          </div>

          <Skeleton className="w-1/3 rounded-lg h-6" isLoaded={!!user}>
            <p>{user?.email}</p>
          </Skeleton>
        </div>

        <Divider />

        <div className="space-y-2">
          <div className="flex">
            <Skeleton className="pr-4 rounded-lg h-6" isLoaded={!!user}>
              <h3 className="font-semibold">Password</h3>
            </Skeleton>

            <Link
              href={'/settings/edit/reset-password'}
              className="font-semibold ml-auto text-green-600"
            >
              Edit
            </Link>
          </div>

          <Skeleton className="w-1/3 rounded-lg h-6" isLoaded={!!user}>
            <p>{'********' || 'N/A'}</p>
          </Skeleton>
        </div>

        <Divider />

        <div className="space-y-2">
          <div className="flex">
            <Skeleton className="pr-4 rounded-lg h-6" isLoaded={!!user}>
              <h3 className="font-semibold">Country</h3>
            </Skeleton>

            <Link
              href={'/settings/edit/change-country'}
              className="font-semibold ml-auto text-green-600"
            >
              Edit
            </Link>
          </div>

          <Skeleton className="w-1/3 rounded-lg h-6" isLoaded={!!user}>
            <p>{user?.country || 'N/A'}</p>
          </Skeleton>
        </div>

        <Divider />

        <div className="space-y-2">
          <div className="flex">
            <Skeleton className="pr-4 rounded-lg h-6" isLoaded={!!user}>
              <h3 className="font-semibold">Mobile Number</h3>
            </Skeleton>

            <Link
              href={'/settings/edit/phone-number'}
              className="font-semibold ml-auto text-green-600"
            >
              Edit
            </Link>
          </div>

          <Skeleton className="w-1/3 rounded-lg h-6" isLoaded={!!user}>
            <p>{user?.phoneNumber || 'N/A'}</p>
          </Skeleton>
        </div>

        <Divider />

        <div className="space-y-2">
          <div className="flex">
            <Skeleton className="pr-4 rounded-lg h-6" isLoaded={!!user}>
              <h3 className="font-semibold">Two Factor Authentication</h3>
            </Skeleton>

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
                      toast.error('Failed to send code', {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: 'colored',
                      });
                    });
                } else if (user?.is2FAEnabled) {
                  await sendTwoFactorActivationCode(user?.email as string)
                    .then(() =>
                      router.push(
                        '/settings/edit/two-factor-authentication?type=deactivate'
                      )
                    )
                    .catch(() => {
                      toast.error('Failed to send code', {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: 'colored',
                      });
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
          </div>
          <Skeleton className="w-1/3 rounded-lg h-6" isLoaded={!!user}>
            <p>{user?.is2FAEnabled ? 'Enabled' : 'Disabled'}</p>
          </Skeleton>
        </div>
      </div>
    </div>
  );
};
