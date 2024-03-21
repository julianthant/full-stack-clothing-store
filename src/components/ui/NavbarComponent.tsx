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
import { ChevronDown, SearchIcon } from './Icons';
import { gabarito } from './Fonts';
import { ShoppingCartIcon, User2Icon, Search } from 'lucide-react';

interface NavbarComponentProps {
  session: any;
  status: boolean;
}

const NavbarComponent: FC<NavbarComponentProps> = ({ session, status }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ['Shop', 'On Sale', 'New Arrivals', 'Brands'];
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBlurred={false} maxWidth="2xl">
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
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent min-w-min text-md font-medium"
                endContent={icons.chevron}
                radius="sm"
                variant="light"
              >
                Shop
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[200px]"
            itemClasses={{
              base: 'gap-4',
            }}
          >
            <DropdownItem>Autoscaling</DropdownItem>
            <DropdownItem>Usage Metrics</DropdownItem>
            <DropdownItem>Production Ready</DropdownItem>
            <DropdownItem>+99% Uptime</DropdownItem>
            <DropdownItem>+Supreme Support</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem>
          <Link
            color="foreground"
            className="hover:font-bold transition-all"
            href="#"
          >
            On Sale
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="hover:font-bold transition-all"
          >
            New Arrivals
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="hover:font-bold transition-all"
          >
            Brands
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="max-sm:hidden px-4">
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
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </NavbarContent>

      <NavbarContent className="max-w-min">
        <NavbarItem className="h-[26px] sm:hidden">
          <button>
            <Search size={26} height={26} />
          </button>
        </NavbarItem>

        <NavbarItem className="h-[26px]">
          <Link href={'/dashboard/cart'}>
            <button>
              <ShoppingCartIcon size={26} height={26} />
            </button>
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
            <Button className="bg-transparent p-0 h-[26px] min-w-[26px]">
              <User2Icon size={26} height={26} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Custom item styles"
            disabledKeys={['profile']}
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
                <User
                  name={session?.user?.name}
                  description={session?.user?.email}
                  classNames={{
                    name: 'text-default-600',
                    description: 'text-default-500',
                  }}
                  avatarProps={{
                    size: 'sm',
                    src: session?.user?.image,
                  }}
                />
              </DropdownItem>
              <DropdownItem key="dashboard" href="/dashboard/profile">
                Dashboard
              </DropdownItem>
              <DropdownItem key="orders" href="/dashboard/orders">
                Orders
              </DropdownItem>
            </DropdownSection>

            <DropdownSection aria-label="Preferences" showDivider>
              <DropdownItem key="settings" href="dashboard/settings">
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
              <DropdownItem key="logout">Log Out</DropdownItem>
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
