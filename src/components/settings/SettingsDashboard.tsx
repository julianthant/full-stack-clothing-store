'use client';

import Link from 'next/link';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { UserComponent } from '../utils/UserComponent';
import { OrderComponent } from './order/OrderComponent';
import { AccountComponent } from './account/AccountComponent';
import { ProfileComponent } from './account/ProfileComponent';
import { AddressComponent } from './account/AdresssComponent';
import { PaymentComponent } from './account/PaymentComponent';
import { DashboardComponent } from './dashboard/DashboardComponent';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from 'lucide-react';
import { get } from 'http';

export function SettingsDashboard() {
  const searchParams = useSearchParams();
  const menuPage = searchParams.get('menu');
  const [selectedKey, setSelectedKey] = useState(menuPage || 'Account');

  const router = useRouter();
  const params = useSearchParams();

  const message = params.get('message');
  const success = params.get('success');

  const menuItems = [
    {
      key: 'Dashboard',
      value: <Home className="h-4 w-4" />,
      component: <DashboardComponent />,
    },
    {
      key: 'Orders',
      value: <ShoppingCart className="h-4 w-4" />,
      component: <OrderComponent />,
    },
    {
      key: 'Products',
      value: <Package className="h-4 w-4" />,
      component: <OrderComponent />,
    },
    {
      key: 'Account',
      value: <Users className="h-4 w-4" />,
      component: <AccountComponent />,
    },
    {
      key: 'Analytics',
      value: <LineChart className="h-4 w-4" />,
      component: <OrderComponent />,
    },
  ];

  const subLinks = [
    {
      key: 'Dashboard',
      value: [
        { key: 'Overview', value: 'Overview' },
        { key: 'Performance', value: 'Performance' },
        // Add more sub-items as needed
      ],
    },
    {
      key: 'Orders',
      value: [
        { key: 'Order History', value: 'Order History' },
        { key: 'Track Order', value: 'Track Order' },
        // Add more sub-items as needed
      ],
    },
    {
      key: 'Products',
      value: [
        { key: 'Product List', value: 'Product List' },
        { key: 'Add Product', value: 'Add Product' },
        // Add more sub-items as needed
      ],
    },
    {
      key: 'Account',
      value: [
        { key: 'Profile', value: <ProfileComponent /> },
        { key: 'Login & Security', value: <AccountComponent /> },
        { key: 'Payments', value: <PaymentComponent /> },
        { key: 'Addresses', value: <AddressComponent /> },
      ],
    },
    {
      key: 'Analytics',
      value: [
        { key: 'Sales Data', value: 'Sales Data' },
        { key: 'Customer Insights', value: 'Customer Insights' },
        // Add more sub-items as needed
      ],
    },
  ];

  const subMenu = subLinks.find((item) => item.key === selectedKey);
  const subMenuPage = decodeURIComponent(searchParams.get('subMenu') || '');

  useEffect(() => {
    if (!success) return;

    if (success === 'true') {
      toast.success(message);
    } else if (success === 'false') {
      toast.error(message);
    }

    router.replace(`/settings?menu=${selectedKey}&subMenu=${subMenuPage}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const firstComponent = subMenu?.value[0];

  const getDefaultSubMenu = (key: string) => {
    const subMenu = subLinks.find((item) => item.key === key);
    const firstComponent = subMenu?.value[0];

    return firstComponent?.key;
  };

  const [menuKey, setMenuKey] = useState(subMenuPage || firstComponent?.key);

  const ShowDashboard = () => {
    const menuLink = subMenu?.value.find((item) => item.key === menuKey);
    return menuLink?.value || null;
  };

  const setMenus = (key: string) => {
    setSelectedKey(key);
    setMenuKey(getDefaultSubMenu(key));
  };

  return (
    <div className="grid border rounded-[20px] w-full md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr] mb-16">
      <div className="hidden border-r bg-muted/40 md:block rounded-l-[20px]">
        <div className="flex h-full max-h-dvh flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <UserComponent page="Profile" />
          </div>

          <div className="flex-1">
            <nav className="grid gap-1 items-start px-2 text-sm font-medium lg:px-4 pb-2">
              {menuItems.map((item) => (
                <Link
                  href={`/settings?menu=${item.key}&subMenu=${getDefaultSubMenu(
                    item.key
                  )}`}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    selectedKey === item.key && 'bg-muted text-primary'
                  )}
                  onClick={() => setMenus(item.key)}
                  key={item.key}
                >
                  {item.value}
                  {item.key}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 pl-6 lg:pr-9 pr-3.5 lg:h-[60px] rounded-tr-[20px]">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold pb-2"
                >
                  CLOTHES.CO
                  <span className="sr-only">Clothes.CO</span>
                </Link>

                <div className="grid gap-2">
                  {menuItems.map((item) => (
                    <div className="grid gap-2" key={item.key}>
                      <Button
                        asChild
                        variant={'ghost'}
                        className="flex items-center justify-start w-full"
                      >
                        <Link
                          href={`/settings?menu=${
                            item.key
                          }&subMenu=${getDefaultSubMenu(item.key)}`}
                          onClick={() => setMenus(item.key)}
                          className={cn(
                            'mx-[-0.65rem] gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
                            selectedKey === item.key && 'bg-muted text-primary'
                          )}
                        >
                          {item.value}
                          {item.key}
                        </Link>
                      </Button>

                      <div className="grid place-items-start pl-4 gap-1">
                        {subLinks.map(
                          (subItem) =>
                            item.key === subItem.key &&
                            subItem.value.map((sub) => (
                              <Button
                                key={sub.key}
                                asChild
                                variant="ghost"
                                className="w-52 flex items-center justify-start"
                              >
                                <Link
                                  href={`/settings?menu=${selectedKey}&subMenu=${encodeURIComponent(
                                    sub.key
                                  )}`}
                                  className={cn(
                                    'text-muted-foreground rounded-xl transition-colors hover:text-foreground',
                                    menuKey === sub.key &&
                                      'text-foreground bg-muted'
                                  )}
                                  onClick={() => {
                                    setSelectedKey(item.key);
                                    setMenuKey(sub.key);
                                  }}
                                >
                                  {sub.key}
                                </Link>
                              </Button>
                            ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <nav className="hidden flex-col gap-3 text-lg font-medium lg:flex lg:flex-row md:items-center md:text-sm lg:gap-2">
            {subMenu?.value.map((item) => (
              <Button key={item.key} asChild variant="ghost">
                <Link
                  href={`/settings?menu=${selectedKey}&subMenu=${encodeURIComponent(
                    item.key
                  )}`}
                  className={cn(
                    'text-muted-foreground transition-colors hover:text-foreground',
                    menuKey === item.key && 'text-foreground'
                  )}
                  onClick={() => {
                    setMenuKey(item.key);
                  }}
                >
                  {item.key}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="relative ml-auto md:grow-0 max-md:flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 lg:w-[160px] xl:w-[320px]"
            />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10 max-h-min">
          <ShowDashboard />
        </main>
      </div>
    </div>
  );
}
