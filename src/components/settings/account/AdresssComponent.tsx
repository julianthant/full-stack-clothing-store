import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { Divider } from '@nextui-org/react';
import { Skeleton } from '@nextui-org/react';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { sendTwoFactorActivationCode } from '@/actions/send-code';

export const AddressComponent = () => {
  const router = useRouter();
  const user = useCurrentUser();

  return (
    <div className="space-y-8">
      <h1 className="text-lg font-semibold md:text-2xl">Account Settings</h1>
      <div className="w-full rounded-lg border border-dashed shadow-sm p-8">
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
                    await sendTwoFactorActivationCode(user?.email as string);
                    await router.push(
                      '/settings/edit/two-factor-authentication?type=activate'
                    );
                  } else if (user?.is2FAEnabled) {
                    await sendTwoFactorActivationCode(user?.email as string);
                    await router.push(
                      '/settings/edit/two-factor-authentication?type=deactivate'
                    );
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
    </div>
  );
};
