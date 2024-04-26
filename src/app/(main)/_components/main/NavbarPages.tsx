import { Link } from '@nextui-org/link';
import { NavbarItem } from '@nextui-org/navbar';

export const NavbarPages = ({}) => {
  return (
    <>
      <NavbarItem className="xl:hover:bg-foreground-100 md:hover:bg-slate-400 h-14 flex items-center 2xl:px-4 xl:px-3 px-2 hover:font-medium transition-all hover:cursor-pointer">
        <Link color="foreground" className="2xl:text-sm text-xs" href="/shop">
          NEW ARRIVALS
        </Link>
      </NavbarItem>

      <NavbarItem className="xl:hover:bg-foreground-100 md:hover:bg-slate-400 h-14 flex items-center 2xl:px-4 xl:px-3 px-2 hover:font-medium transition-all hover:cursor-pointer">
        <Link color="foreground" className="2xl:text-sm text-xs" href="/shop">
          CLOTHING
        </Link>
      </NavbarItem>

      <NavbarItem className="xl:hover:bg-foreground-100 md:hover:bg-slate-400 h-14 flex items-center 2xl:px-4 xl:px-3 px-2 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop?cid=6993"
          className="2xl:text-sm text-xs"
        >
          SHOES
        </Link>
      </NavbarItem>

      <NavbarItem className="xl:hover:bg-foreground-100 md:hover:bg-slate-400 h-14 flex items-center 2xl:px-4 xl:px-3 px-2 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="2xl:text-sm text-xs"
        >
          ACCESSORIES
        </Link>
      </NavbarItem>

      <NavbarItem className="xl:hover:bg-foreground-100 md:hover:bg-slate-400 h-14 flex items-center 2xl:px-4 xl:px-3 px-2 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="2xl:text-sm text-xs"
        >
          BRANDS
        </Link>
      </NavbarItem>

      <NavbarItem className="xl:hover:bg-foreground-100 md:hover:bg-slate-400 h-14 flex items-center 2xl:px-4 xl:px-3 px-2 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="2xl:text-sm text-xs"
        >
          SPORTSWEAR
        </Link>
      </NavbarItem>

      <NavbarItem className="xl:hover:bg-foreground-100 md:hover:bg-slate-400 h-14 flex items-center 2xl:px-4 xl:px-3 px-2 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="2xl:text-sm text-xs"
        >
          PLUS & TALL
        </Link>
      </NavbarItem>

      <NavbarItem className="xl:hover:bg-foreground-100 md:hover:bg-slate-400 h-14 flex items-center 2xl:px-4 xl:px-3 px-2 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="2xl:text-sm text-xs"
        >
          TAILORING
        </Link>
      </NavbarItem>

      <NavbarItem className="xl:hover:bg-foreground-100 md:hover:bg-slate-400 h-14 flex items-center 2xl:px-4 xl:px-3 px-2 hover:font-medium transition-all hover:cursor-pointer">
        <Link
          color="foreground"
          href="/shop/brands?cid=1361"
          className="2xl:text-sm text-xs"
        >
          SALE
        </Link>
      </NavbarItem>
    </>
  );
};
