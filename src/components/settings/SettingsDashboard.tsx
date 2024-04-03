'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

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

export function SettingsDashboard() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const menuPage = searchParams.get('menu');
  const [selectedKey, setSelectedKey] = useState(menuPage || 'Account');

  const menuItems = [
    { key: 'Dashboard', value: <Home className="h-4 w-4" /> },
    { key: 'Orders', value: <ShoppingCart className="h-4 w-4" /> },
    { key: 'Products', value: <Package className="h-4 w-4" /> },
    { key: 'Account', value: <Users className="h-4 w-4" /> },
    { key: 'Analytics', value: <LineChart className="h-4 w-4" /> },
  ];

  const subLinks = [
    {
      key: 'Account',
      value: ['Login & Security', 'Payments', 'Addresses', 'Profiles'],
    },
  ];

  const subMenu = subLinks.find((item) => item.key === selectedKey);
  const subMenuPage = searchParams.get('subMenu');
  const [menuKey, setMenuKey] = useState(subMenuPage || 'Login & Security');

  return (
    <div className="grid border rounded-[20px] min-h-[700px] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block rounded-l-[20px]">
        <div className="flex h-full max-h-dvh flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <UserComponent />
          </div>

          <div className="flex-1">
            <nav className="grid gap-1 items-start px-2 text-sm font-medium lg:px-4">
              {menuItems.map((item) => (
                <Link
                  href="#"
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    selectedKey === item.key && 'bg-muted text-primary'
                  )}
                  onClick={() => {
                    setSelectedKey(item.key),
                      menuPage && router.push('/settings');
                  }}
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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 rounded-tr-[20px]">
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
                    href="#"
                    className={cn(
                      'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground',
                      selectedKey === item.key && 'bg-muted text-primary'
                    )}
                    onClick={() => {
                      setSelectedKey(item.key),
                        menuPage && router.push('/settings');
                    }}
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
              <Button key={item} asChild variant="ghost">
                <Link
                  href="#"
                  className={cn(
                    'text-muted-foreground transition-colors hover:text-foreground',
                    menuKey === item && 'text-foreground'
                  )}
                  onClick={() => {
                    setMenuKey(item),
                      menuPage && subMenuPage && router.push('/settings');
                  }}
                >
                  {item}
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
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10">
          {selectedKey === 'Account' && menuKey === 'Login & Security' && (
            <AccountComponent />
          )}

          {selectedKey === 'Account' && menuKey === 'Payments' && (
            <PaymentComponent />
          )}

          {selectedKey === 'Account' && menuKey === 'Addresses' && (
            <AddressComponent />
          )}

          {selectedKey === 'Account' && menuKey === 'Profiles' && (
            <ProfileComponent />
          )}
        </main>
      </div>
    </div>
  );
}
