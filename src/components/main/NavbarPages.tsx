import { Icons } from '../utils/Icons';

import {
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Link,
} from '@nextui-org/react';

export const NavbarPages = ({}) => {
  return (
    <NavbarContent className="hidden lg:flex gap-4 pl-8 pr-4" justify="center">
      <Dropdown className="w-[100px]">
        <NavbarItem>
          <DropdownTrigger>
            <Button
              disableRipple
              className="p-0 bg-transparent data-[hover=true]:bg-transparent data-[hover=true]:font-medium min-w-min text-base font-light"
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
          className="text-base font-light"
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
          className="hover:font-medium transition-all text-base font-light"
          href="/shop"
        >
          On Sale
        </Link>
      </NavbarItem>

      <NavbarItem>
        <Link
          color="foreground"
          href="/shop/new-arrivals"
          className="hover:font-medium transition-all text-base font-light"
        >
          New Arrivals
        </Link>
      </NavbarItem>

      <NavbarItem>
        <Link
          color="foreground"
          href="/shop/brands"
          className="hover:font-medium transition-all text-base font-light"
        >
          Brands
        </Link>
      </NavbarItem>
    </NavbarContent>
  );
};
