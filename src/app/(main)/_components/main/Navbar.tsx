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
        wrapper:
          'p-0 xl:h-14 max-xl:flex-col h-full max-xl:pt-2 max-xl:gap-2 max-md:pb-2',
        base: 'p-0',
      }}
    >
      <div className="flex items-center justify-between w-full container">
        <NavbarContent className="flex max-w-min items-center gap-4">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden h-12"
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

        <NavbarContent
          className="xl:flex gap-0 font-medium hidden"
          justify="center"
        >
          <NavbarPages />
        </NavbarContent>

        <NavbarContent className="max-w-min gap-1">
          <NavbarItem className="sm:pr-1">
            <Button
              className="w-52 h-10 sm:flex hidden items-center hover:cursor-pointer rounded-full justify-start px-3 text-default-500 bg-default-400/20 dark:bg-default-500/20 font-normal text-[14px]"
              disabled
            >
              <Search size={20} />
              <span className="ml-2">Click to search...</span>
            </Button>

            <Button
              isIconOnly
              className="bg-transparent hover:bg-gray-100/80 sm:hidden"
            >
              <Search size={26} height={26} />
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

      <NavbarContent
        className="xl:hidden max-md:hidden max-xl:bg-slate-400/80 w-full"
        justify="start"
      >
        <div className="gap-0 font-medium flex container">
          <NavbarPages />
        </div>
      </NavbarContent>
    </Navbar>
  );
};
