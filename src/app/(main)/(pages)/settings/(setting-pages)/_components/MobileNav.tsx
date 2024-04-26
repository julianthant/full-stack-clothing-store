import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { SubLink } from '@/components/utils/SubLink';
import { MenuLink } from '@/components/utils/MenuLink';

import { Home, LineChart, Package, ShoppingCart, Users } from 'lucide-react';

export const MobileNav = () => {
  const NavigationLinks = [
    {
      mainPage: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      subPages: ['Overview', 'Performance'],
    },
    {
      mainPage: 'Orders',
      icon: <ShoppingCart className="h-4 w-4" />,
      subPages: ['Order-History', 'Track-Order'],
    },
    {
      mainPage: 'Products',
      icon: <Package className="h-4 w-4" />,
      path: 'products/product-list',
      subPages: ['Product-List', 'Add Product'],
    },
    {
      mainPage: 'Account',
      icon: <Users className="h-4 w-4" />,
      subPages: ['Profile', 'Login-&-Security', 'Payments', 'Addresses'],
    },
    {
      mainPage: 'Analytics',
      icon: <LineChart className="h-4 w-4" />,
      subPages: ['Sales-Data', 'Customer-Insights'],
    },
  ];

  return (
    <>
      <nav className="grid text-lg font-medium">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold pb-2"
        >
          CLOTHES.CO
          <span className="sr-only">Clothes.CO</span>
        </Link>

        <div className="grid gap-2">
          {NavigationLinks.map((link) => (
            <div className="grid gap-2" key={link.mainPage}>
              <Button
                asChild
                variant={'ghost'}
                className="flex items-center justify-start w-full"
              >
                <MenuLink
                  title={link.mainPage}
                  path={link.subPages[0]}
                  Icon={link.icon}
                />
              </Button>

              <div className="grid place-items-start pl-4 gap-1">
                {link.subPages.map((subPage) => (
                  <Button
                    key={subPage}
                    asChild
                    variant="ghost"
                    className="w-52 flex items-center justify-start"
                  >
                    <SubLink
                      title={subPage}
                      path={`${link.mainPage}/${subPage}`}
                    />
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};
