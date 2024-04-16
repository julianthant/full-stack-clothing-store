'use client';

import Link from 'next/link';
import { FC, useState } from 'react';

import { Icons } from '../utils/Icons';
import { NavbarPages } from './NavbarPages';
import { AccountDropdown } from './AccountDropdown';
import { ShoppingCartIcon } from 'lucide-react';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Input,
} from '@nextui-org/react';

interface NavbarComponentProps {}

const NavbarComponent: FC<NavbarComponentProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Shop', 'On Sale', 'New Arrivals', 'Brands'];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      maxWidth="2xl"
      className="border-b-2 sm:py-1"
      classNames={{
        wrapper: 'max-sm:flex-col max-sm:min-h-[6.4rem] max-sm:gap-0 px-0',
      }}
    >
      <div className="flex items-center justify-center w-full max-sm:pt-2 pb-1 max-sm:justify-between container">
        <NavbarContent className="flex max-w-min items-center gap-2">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="lg:hidden"
          />

          <NavbarBrand>
            <Link
              href="/"
              className={`font-black text-inherit text-4xl drop-shadow-md max-sm:text-[26px] black-integral pb-1`}
            >
              CLOTHES.CO
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarPages />

        <NavbarContent className="max-sm:hidden px-4" justify="end">
          <Input
            classNames={{
              base: 'max-w-full h-10',
              mainWrapper: 'h-full',
              input: 'text-small',
              inputWrapper:
                'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<Icons.searchIcon size={18} />}
            type="search"
          />
        </NavbarContent>

        <NavbarContent className="max-w-min gap-1">
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

          <AccountDropdown />
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

      <NavbarContent className="sm:hidden w-full pb-2" justify="end">
        <Input
          classNames={{
            base: 'max-w-full max-sm:container h-10',
            mainWrapper: 'h-full',
            input: 'text-small',
            inputWrapper:
              'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<Icons.searchIcon size={18} />}
          type="search"
        />
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarComponent;
