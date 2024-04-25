import Link from 'next/link';
import { SubLink } from '@/components/utils/SubLink';
import { FC, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { MenuLink } from '@/components/utils/MenuLink';
import { UserComponent } from '@/components/utils/UserComponent';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import {
  Home,
  LineChart,
  Menu,
  Package,
  ShoppingCart,
  Users,
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
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
              <UserComponent page="Profile" />
            </div>

            <div className="flex-1">
              <nav className="grid gap-1 items-start px-2 text-sm font-medium lg:px-4 pb-2">
                {NavigationLinks.map((link) => (
                  <MenuLink
                    key={link.mainPage}
                    title={link.mainPage}
                    path={link.subPages[0]}
                  />
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col relative">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 absolute top-2.5 left-4 lg:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col overflow-y-auto max-h-screen"
              >
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
              </SheetContent>
            </Sheet>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
