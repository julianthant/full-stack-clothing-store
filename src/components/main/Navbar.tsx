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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  User,
  Input,
} from '@nextui-org/react';
import Link from 'next/link';
import { Icons } from '../utils/Icons';
import { gabarito } from '../utils/Fonts';
import { ShoppingCartIcon, User2Icon, Search } from 'lucide-react';
import { SignOut } from '@/actions/signout';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { AvatarFallback } from '../utils/Avatar';

interface NavbarComponentProps {}

const NavbarComponent: FC<NavbarComponentProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Shop', 'On Sale', 'New Arrivals', 'Brands'];

  const user = useCurrentUser();

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

      <NavbarContent className="hidden lg:flex gap-4 px-4" justify="center">
        <Dropdown className="w-[100px]">
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent min-w-min text-md font-medium"
                endContent={<Icons.chevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                Shop
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu
            aria-label="ACME features"
            itemClasses={{
              base: 'gap-4',
            }}
          >
            <DropdownItem href="/shop/men">Men&apos;s Wear</DropdownItem>
            <DropdownItem href="/shop/women">Women&apos;s Wear</DropdownItem>
            <DropdownItem href="/shop/children">
              Children&apos;s Wear
            </DropdownItem>
            <DropdownItem href="/shop/casual">Casual Outfits</DropdownItem>
            <DropdownItem href="/shop/formal">Formal Clothing</DropdownItem>
            <DropdownItem href="/shop/party">Party Outfits</DropdownItem>
            <DropdownItem href="/shop/sports">Sports Wear</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
          <Link
            color="foreground"
            className="hover:font-bold transition-all"
            href="/shop"
          >
            On Sale
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            color="foreground"
            href="/shop/new-arrivals"
            className="hover:font-bold transition-all"
          >
            New Arrivals
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            color="foreground"
            href="/shop/brands"
            className="hover:font-bold transition-all"
          >
            Brands
          </Link>
        </NavbarItem>
      </NavbarContent>

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
                className="h-12 gap-2 opacity-100"
              >
                <User
                  name={user?.name || 'Guest'}
                  description={user?.email}
                  classNames={{
                    name: 'text-default-600',
                    description: 'text-default-500',
                  }}
                  avatarProps={{
                    size: 'sm',
                    src: user?.image as string,
                    fallback: <AvatarFallback />,
                  }}
                />
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
                    <button
                      className="px-2 py-1.5 w-full text-left"
                      type="submit"
                    >
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
