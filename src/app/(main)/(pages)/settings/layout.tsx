import { FC, ReactNode } from 'react';

import { UserComponent } from '@/components/utils/UserComponent';
import { MenuLink } from '@/components/utils/MenuLink';

import { Home, LineChart, Package, ShoppingCart, Users } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const NavigationLinks = [
    {
      mainPage: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      defaultPage: 'Overview',
    },
    {
      mainPage: 'Orders',
      icon: <ShoppingCart className="h-4 w-4" />,
      defaultPage: 'Order-History',
    },
    {
      mainPage: 'Products',
      icon: <Package className="h-4 w-4" />,
      path: 'products/product-list',
      defaultPage: 'Product-List',
    },
    {
      mainPage: 'Account',
      icon: <Users className="h-4 w-4" />,
      defaultPage: 'Profile',
    },
    {
      mainPage: 'Analytics',
      icon: <LineChart className="h-4 w-4" />,
      defaultPage: 'Sales-Data',
    },
  ];

  return (
    <div className="container">
      <div className="grid border rounded-[20px] w-full md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] mb-16">
        <div className="hidden border-r bg-muted/40 md:block rounded-l-[20px]">
          <div className="flex h-full max-h-dvh flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <UserComponent page="Profile" />
            </div>

            <div className="flex-1">
              <nav className="grid gap-1 items-start px-2 text-sm font-medium lg:px-4 pb-2">
                {NavigationLinks.map((link) => (
                  <MenuLink
                    key={link.mainPage}
                    title={link.mainPage}
                    path={link.defaultPage}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
