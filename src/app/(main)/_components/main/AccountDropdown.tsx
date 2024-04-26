import Link from 'next/link';
import dynamic from 'next/dynamic';

import { SignOut } from '@/server/actions/authentication/signout';
import { Suspense } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { UserComponentSkeleton } from '@/components/skeleton/UserComponentSkeleton';

import {
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown';

const UserComponent = dynamic(() =>
  import('@/components/utils/UserComponent').then((mod) => mod.UserComponent)
);

export const AccountDropdown = ({ user }: any) => {
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
          'data-[hover=true]:bg-default-100',
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
          <Suspense fallback={<UserComponentSkeleton />}>
            <UserComponent user={user} page="Navbar" />
          </Suspense>
        </DropdownItem>
        <DropdownItem key="dashboard" href="/settings/account/profile">
          <Link className="size-full" href="/settings/account/profile">
            Profile
          </Link>
        </DropdownItem>
        <DropdownItem key="dashboard" href="/settings/dashboard/overview">
          <Link href="/settings/dashboard/overview">Dashboard</Link>
        </DropdownItem>
      </DropdownSection>

      <DropdownSection aria-label="Preferences" showDivider>
        <DropdownItem key="orders" href="/settings/orders/order-history">
          <Link href="/settings/orders/order-history">Orders</Link>
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
        <DropdownItem key="help_and_feedback" href="/customer_support">
          Help & Feedback
        </DropdownItem>
        <DropdownItem key="logout" className="p-0">
          {!!user ? (
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
          ) : (
            <Link href="/auth/login">
              <button className="px-2 py-1.5 w-full text-left">Sign In</button>
            </Link>
          )}
        </DropdownItem>
      </DropdownSection>
    </DropdownMenu>
  );
};
