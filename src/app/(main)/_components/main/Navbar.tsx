'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { Icons } from '@/components/utils/Icons';
import { NavbarPages } from './NavbarPages';
import { Search, ShoppingCartIcon } from 'lucide-react';

const AccountDropdown = dynamic(() =>
  import('./AccountDropdown').then((mod) => mod.AccountDropdown)
);

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';

import { User2Icon } from 'lucide-react';
import { Button as NextButton } from '@nextui-org/button';
import { Dropdown, DropdownTrigger } from '@nextui-org/dropdown';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';

export const NavbarComponent = ({ user }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Shop', 'On Sale', 'New Arrivals', 'Brands'];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      maxWidth="2xl"
      className="border-b-2 p-0"
      classNames={{
        wrapper: 'p-0 h-14',
        base: 'p-0',
      }}
    >
      <div className="flex items-center justify-between w-full container">
        <NavbarContent className="flex max-w-min items-center gap-2">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden"
          />
          <NavbarBrand>
            <Link
              href="/"
              className="text-inherit text-4xl drop-shadow-md max-sm:text-[26px]"
            >
              <Icons.logo />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarPages />

        <NavbarContent className="max-w-min gap-1">
          <NavbarItem className="pr-1">
            <Button
              className="w-52 h-10 flex items-center hover:cursor-pointer rounded-full justify-start px-3 text-default-500 bg-default-400/20 dark:bg-default-500/20 font-normal text-[14px]"
              disabled
            >
              <Search size={20} />
              <span className="ml-2">Click to search...</span>
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Link href={'/cart'}>
              <Button
                isIconOnly
                className="bg-transparent hover:bg-gray-100/80"
              >
                <ShoppingCartIcon size={26} height={26} />
              </Button>
            </Link>
          </NavbarItem>

          <Dropdown
            radius="sm"
            classNames={{
              base: 'before:bg-default-200 mt-4', // change arrow background
              content: 'p-0 border-divider bg-background',
            }}
            placement="bottom-end"
          >
            <DropdownTrigger>
              <NextButton
                isIconOnly
                className="bg-transparent hover:bg-gray-100/80"
              >
                <User2Icon size={26} height={26} />
              </NextButton>
            </DropdownTrigger>
            <AccountDropdown user={user} />
          </Dropdown>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
                }
                className="w-full"
                href="#"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </div>
    </Navbar>
  );
};
