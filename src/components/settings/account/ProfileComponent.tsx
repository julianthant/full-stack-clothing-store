'use client';

import { format } from 'date-fns';
import { Divider } from '@nextui-org/react';
import { useCurrentUser } from '@/hooks/useCurrentUser';

import EditUserComponent from '@/components/utils/EditUserComponent';

export const ProfileComponent = () => {
  const user = useCurrentUser();

  return (
    <div className="space-y-8">
      <div className="w-full rounded-lg border border-dashed shadow-sm p-8">
        <div className="space-y-4 tracking-wide">
          <EditUserComponent
            Title="Name"
            Name={user?.name || 'N/A'}
            FormLink={'/settings/edit/change-name'}
          />

          <Divider />

          <EditUserComponent
            Title="Country"
            Name={user?.country || 'N/A'}
            FormLink={'/settings/edit/change-country'}
          />

          <Divider />

          <EditUserComponent
            Title="Date Of Birth"
            Name={
              (user?.dateOfBirth &&
                format(user?.dateOfBirth, 'dd MMMM, yyy')) ||
              'N/A'
            }
            FormLink={'/settings/edit/date-of-birth'}
          />

          <Divider />

          <EditUserComponent
            Title="Gender"
            Name={
              (user?.gender &&
                user?.gender.charAt(0).toUpperCase() + user?.gender.slice(1)) ||
              'N/A'
            }
            FormLink={'/settings/edit/gender'}
          />

          <Divider />

          <EditUserComponent
            Title="Primary Mobile Number"
            Name={user?.phoneNumber || 'N/A'}
            FormLink={'/settings/edit/phone-number'}
          />
        </div>
      </div>
    </div>
  );
};
