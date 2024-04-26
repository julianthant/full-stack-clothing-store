import dynamic from 'next/dynamic';

import { MenuLink } from '@/components/utils/MenuLink';
import { FC, ReactNode, Suspense } from 'react';

import { UserComponent } from '@/components/utils/UserComponent';
import { Home, LineChart, Package, ShoppingCart, Users } from 'lucide-react';
import { UserComponentSkeleton } from '@/components/skeleton/UserComponentSkeleton';
import { currentUser } from '@/lib/server-auth';

const MobileNav = dynamic(() =>
  import('./_components/MobileNav').then((mod) => mod.MobileNav)
);

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const user = currentUser();

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
    <div className="container">
      <div className="grid border rounded-[20px] w-full md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] mb-16">
        <div className="hidden border-r bg-muted/40 md:block rounded-l-[20px]">
          <div className="flex h-full max-h-dvh flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Suspense fallback={<UserComponentSkeleton />}>
                <UserComponent user={user} page="Profile" />
              </Suspense>
            </div>

            <div className="flex-1">
              <nav className="grid gap-1 items-start px-2 text-sm font-medium lg:px-4 pb-2">
                {NavigationLinks.map((link) => (
                  <MenuLink
                    key={link.mainPage}
                    title={link.mainPage}
                    path={link.subPages[0]}
                    Icon={link.icon}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col relative">
            <MobileNav />

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
