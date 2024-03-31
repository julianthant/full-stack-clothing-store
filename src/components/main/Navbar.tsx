'use client';

import { FC, useState } from 'react';
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
import Link from 'next/link';
import { Icons } from '../utils/Icons';
import { gabarito } from '../utils/Fonts';
import { ShoppingCartIcon, Search } from 'lucide-react';
import { AccountDropdown } from './AccountDropdown';
import { NavbarPages } from './NavbarPages';

interface NavbarComponentProps {}

const NavbarComponent: FC<NavbarComponentProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Shop', 'On Sale', 'New Arrivals', 'Brands'];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      maxWidth="2xl"
      height={'5rem'}
      className="border-b-2"
    >
      <NavbarContent className="flex max-w-min">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden"
        />

        <NavbarBrand>
          <Link
            href="/"
            className={`font-black text-inherit text-4xl ${gabarito.className} drop-shadow-lg`}
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

      <NavbarContent className="max-w-min gap-2">
        <NavbarItem className="sm:hidden">
          <Button isIconOnly className="bg-transparent">
            <Search size={26} height={26} />
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Link href={'/cart'}>
            <Button isIconOnly className="bg-transparent hover:bg-gray-100/80">
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
    </Navbar>
  );
};

export default NavbarComponent;
