import { Link } from '@nextui-org/link';
import { NavbarContent, NavbarItem } from '@nextui-org/navbar';

export const NavbarPages = ({}) => {
  return (
    <NavbarContent className="hidden lg:flex gap-4 pl-6 pr-4" justify="center">
      <NavbarItem>
        <Link
          color="foreground"
          className="hover:font-medium transition-all text-base font-light"
          href="/shop"
        >
          Shop
        </Link>
      </NavbarItem>

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
          href="/shop?cid=6993"
          className="hover:font-medium transition-all text-base font-light"
        >
          New Arrivals
        </Link>
      </NavbarItem>

      <NavbarItem>
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="hover:font-medium transition-all text-base font-light"
        >
          Brands
        </Link>
      </NavbarItem>
    </NavbarContent>
  );
};
