import { Link } from '@nextui-org/link';
import { NavbarContent, NavbarItem } from '@nextui-org/navbar';

export const NavbarPages = ({}) => {
  return (
    <NavbarContent
      className="hidden lg:flex gap-0 text-xs font-medium"
      justify="center"
    >
      <NavbarItem className="hover:bg-foreground-100 h-14 flex items-center px-4 hover:font-medium transition-all hover:cursor-pointer">
        <Link color="foreground" className="text-sm" href="/shop">
          NEW ARRIVALS
        </Link>
      </NavbarItem>

      <NavbarItem className="hover:bg-foreground-100 h-14 flex items-center px-4 hover:font-medium transition-all hover:cursor-pointer">
        <Link color="foreground" className="text-sm" href="/shop">
          CLOTHING
        </Link>
      </NavbarItem>

      <NavbarItem className="hover:bg-foreground-100 h-14 flex items-center px-4 hover:font-medium transition-all hover:cursor-pointer">
        <Link color="foreground" href="/shop?cid=6993" className="text-sm">
          SHOES
        </Link>
      </NavbarItem>

      <NavbarItem className="hover:bg-foreground-100 h-14 flex items-center px-4 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="text-sm"
        >
          ACCESSORIES
        </Link>
      </NavbarItem>

      <NavbarItem className="hover:bg-foreground-100 h-14 flex items-center px-4 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="text-sm"
        >
          BRANDS
        </Link>
      </NavbarItem>

      <NavbarItem className="hover:bg-foreground-100 h-14 flex items-center px-4 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="text-sm"
        >
          SPORTSWEAR
        </Link>
      </NavbarItem>

      <NavbarItem className="hover:bg-foreground-100 h-14 flex items-center px-4 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="text-sm"
        >
          PLUS & TALL
        </Link>
      </NavbarItem>

      <NavbarItem className="hover:bg-foreground-100 h-14 flex items-center px-4 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="text-sm"
        >
          TAILORING
        </Link>
      </NavbarItem>

      <NavbarItem className="hover:bg-foreground-100 h-14 flex items-center px-4 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="text-sm"
        >
          SALE
        </Link>
      </NavbarItem>
    </NavbarContent>
  );
};
