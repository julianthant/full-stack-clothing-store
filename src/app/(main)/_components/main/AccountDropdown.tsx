import dynamic from 'next/dynamic';

import { SignOut } from '@/server/actions/authentication/signout';
import { useRouter } from 'next/navigation';
import { ThemeSwitcher } from './ThemeSwitcher';
import { UserComponentSkeleton } from '@/components/skeleton/UserComponentSkeleton';

import {
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown';

const UserComponent = dynamic(
  () =>
    import('@/components/utils/UserComponent').then((mod) => mod.UserComponent),
  { loading: () => <UserComponentSkeleton /> }
);

export const AccountDropdown = ({ user }: any) => {
  const router = useRouter();

  return (
    <DropdownMenu
      aria-label="Custom item styles"
      className="p-3"
      itemClasses={{
        base: [
          'rounded-md',
          'text-default-500',
          'transition-opacity',
          'data-[hover=true]:text-foreground',
          'data-[hover=true]:bg-default-300',
          'dark:data-[hover=true]:bg-default-50',
          'data-[selectable=true]:focus:bg-default-50',
          'data-[pressed=true]:opacity-70',
          'data-[focus-visible=true]:ring-default-500',
        ],
      }}
    >
      <DropdownSection aria-label="Profile & Actions" showDivider>
        <DropdownItem
          isReadOnly
          key="profile"
          className="h-14 gap-2 opacity-100"
        >
          <UserComponent user={user} page="Navbar" />
        </DropdownItem>

        <DropdownItem
          key="dashboard"
          onClick={() => router.push('/settings/account/profile')}
        >
          <p className="w-full h-full">Profile</p>
        </DropdownItem>
        <DropdownItem
          key="dashboard"
          onClick={() => router.push('/settings/dashboard/overview')}
        >
          <p>Dashboard</p>
        </DropdownItem>
      </DropdownSection>

      <DropdownSection aria-label="Preferences" showDivider>
        <DropdownItem
          key="orders"
          onClick={() => router.push('/settings/orders/order-history')}
        >
          <p>Orders</p>
        </DropdownItem>
        <DropdownItem
          isReadOnly
          key="theme"
          className="cursor-default"
          endContent={<ThemeSwitcher />}
        >
          Theme
        </DropdownItem>
      </DropdownSection>

      <DropdownSection aria-label="Help & Feedback">
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" className="p-0">
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              await SignOut();
            }}
          >
            <button className="px-2 py-1.5 w-full text-left" type="submit">
              Sign Out
            </button>
          </form>
        </DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  );
};
