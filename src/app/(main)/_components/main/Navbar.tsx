'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

import { Icons } from '@/components/utils/Icons';
import { Input } from '@/components/ui/Input';
import { AvatarIcon } from '@nextui-org/shared-icons';
import { Search, ShoppingCartIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AccountDropdown = dynamic(() =>
  import('./AccountDropdown').then((mod) => mod.AccountDropdown)
);

import { Button } from '@/components/ui/button';
import { Button as NextButton } from '@nextui-org/button';
import { Dropdown, DropdownTrigger } from '@nextui-org/dropdown';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import { cn } from '@/lib/utils';

export const NavbarComponent = ({ user }: any) => {
  return (
    <Navbar
      isBlurred={false}
      maxWidth="full"
      className="border-b-2"
      classNames={{ wrapper: 'px-4' }}
    >
      <NavbarContent
        className="flex max-w-min items-center gap-4"
        justify="start"
      >
        <NavbarBrand>
          <Link
            href="/"
            className="text-inherit text-4xl drop-shadow-md max-sm:text-[26px]"
          >
            <Icons.logo />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex md:w-[600px] flex-grow gap-4 relative"
        justify="center"
      >
        <Input
          className={cn(
            'rounded-md text-base h-10 w-full pl-5 tracking-wide focus-visible:ring-[#39ccc0]'
          )}
          placeholder="Search StyleZ"
        />

        <button className="absolute h-10 w-10  flex items-center justify-center right-0 rounded-r-md bg-[#39cccc]">
          <Search size={20} height={20} />
        </button>
      </NavbarContent>

      <NavbarContent className="max-w-min gap-1" justify="end">
        <NavbarItem className="sm:hidden">
          <NextButton
            isIconOnly
            className="bg-transparent hover:bg-gray-100/80"
          >
            <Search size={26} height={26} />
          </NextButton>
        </NavbarItem>

        {user && (
          <NavbarItem className="relative pr-2">
            <Link href={'/cart'}>
              <NextButton
                isIconOnly
                className="bg-transparent hover:bg-gray-100/80"
              >
                <ShoppingCartIcon size={26} height={26} />
              </NextButton>
            </Link>
            <span className="absolute top-1 right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
              0
            </span>
          </NavbarItem>
        )}

        {user ? (
          <Dropdown
            radius="sm"
            classNames={{
              base: 'before:bg-default-200 mt-4', // change arrow background
              content: 'p-0 border-divider bg-background',
            }}
            placement="bottom-end"
          >
            <DropdownTrigger>
              <NextButton disableRipple isIconOnly className="bg-transparent">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={user?.image as string} />
                  <AvatarFallback>
                    <AvatarIcon className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
              </NextButton>
            </DropdownTrigger>
            <AccountDropdown user={user} />
          </Dropdown>
        ) : (
          <NavbarItem>
            <Button asChild variant={'outline'} className="font-medium h-9">
              <Link prefetch className="font-medium" href="/auth/login">
                Sign In
              </Link>
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};
