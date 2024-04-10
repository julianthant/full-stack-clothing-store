'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Link from 'next/link';
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

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserComponent } from '../utils/UserComponent';
import { cn } from '@/lib/utils';
import { AccountComponent } from './account/AccountComponent';
import { ProfileComponent } from './account/ProfileComponent';
import { AddressComponent } from './account/AdresssComponent';
import { PaymentComponent } from './account/PaymentComponent';
import { DashboardComponent } from './dashboard/DashboardComponent';
import { OrderComponent } from './order/OrderComponent';

export function SettingsDashboard() {
  const searchParams = useSearchParams();
  const menuPage = searchParams.get('menu');
  const [selectedKey, setSelectedKey] = useState(menuPage || 'Account');

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
      key: 'Account',
      value: [
        { key: 'Profiles', value: <ProfileComponent /> },
        { key: 'Login & Security', value: <AccountComponent /> },
        {
          key: 'Payments',
          value: <PaymentComponent />,
        },
        { key: 'Addresses', value: <AddressComponent /> },
      ],
    },
  ];

  const subMenu = subLinks.find((item) => item.key === selectedKey);
  const subMenuPage = decodeURIComponent(searchParams.get('subMenu') || '');
  const firstComponent = subMenu?.value[0];

  const getDefaultSubMenu = () => {
    const defaultSubMenu = firstComponent?.key;
    return encodeURIComponent(defaultSubMenu || '');
  };

  const [menuKey, setMenuKey] = useState(subMenuPage || firstComponent?.key);

  const showDashboard = () => {
    const menuLink = subMenu?.value.find((item) => item.key === menuKey);

    return menuLink?.value || null;
  };

  return (
    <div className="grid border rounded-[20px] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] mb-16">
      <div className="hidden border-r bg-muted/40 md:block rounded-l-[20px]">
        <div className="flex h-full max-h-dvh flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <UserComponent page="Profile" />
          </div>

          <div className="flex-1">
            <nav className="grid gap-1 items-start px-2 text-sm font-medium lg:px-4">
              {menuItems.map((item) => (
                <Link
                  href={`/settings?menu=${
                    item.key
                  }&subMenu=${getDefaultSubMenu()}`}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    selectedKey === item.key && 'bg-muted text-primary'
                  )}
                  onClick={() => setSelectedKey(item.key)}
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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 pl-6 xl:pr-9 pr-7 lg:h-[60px] rounded-tr-[20px]">
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
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Clothes.CO</span>
                </Link>
                {menuItems.map((item) => (
                  <Link
                    href={`/settings?menu=${selectedKey}`}
                    className={cn(
                      'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
                      selectedKey === item.key && 'bg-muted text-primary'
                    )}
                    key={item.key}
                  >
                    {item.value}
                    {item.key}
                  </Link>
                ))}
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
              className="w-full rounded-lg bg-background pl-8 lg:w-[180px] xl:w-[320px]"
            />
          </div>
        </header>

        <div className="rounded-br-[20px] overflow-hidden">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10 max-h-[500px] min-h-[500px] overflow-auto">
            {showDashboard()}
          </main>
        </div>
      </div>
    </div>
  );
}
