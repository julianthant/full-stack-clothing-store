'use client';

import Link from 'next/link';

import { SignOut } from '@/actions/authentication/signout';
import { useCurrentUser } from '@/hooks/useCurrentUser';

import { User2Icon } from 'lucide-react';
import { UserComponent } from '../utils/UserComponent';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from '@nextui-org/react';

export const AccountDropdown = () => {
  const user = useCurrentUser();

  return (
    <Dropdown
      radius="sm"
      classNames={{
        base: 'before:bg-default-200 mt-4', // change arrow background
        content: 'p-0 border-divider bg-background',
      }}
      placement="bottom-end"
    >
      <DropdownTrigger>
        <Button isIconOnly className="bg-transparent hover:bg-gray-100/80">
          <User2Icon size={26} height={26} />
        </Button>
      </DropdownTrigger>
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
            <UserComponent page="Navbar" />
          </DropdownItem>
          <DropdownItem key="dashboard" href="/settings?menu=Account">
            Account
          </DropdownItem>
          <DropdownItem key="orders" href="/settings?menu=Orders">
            Orders
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem key="settings" href="/settings">
            Settings
          </DropdownItem>
          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={
              <select
                className="z-10 outline-none w-16 py-0.5 rounded-md text-tiny group-data-[hover=true]:border-default-500 border-small border-default-300 dark:border-default-200 bg-transparent text-default-500"
                id="theme"
                name="theme"
              >
                <option>System</option>
                <option>Dark</option>
                <option>Light</option>
              </select>
            }
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
                <button className="px-2 py-1.5 w-full text-left">
                  Sign In
                </button>
              </Link>
            )}
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
