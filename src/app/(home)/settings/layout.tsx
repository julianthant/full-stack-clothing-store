import { MenuLink } from '@/components/utils/MenuLink';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const NavigationLinks = [
    'General',
    'Security',
    'Orders',
    'Billing',
    'Shipping',
    'Invoices',
  ];

  return (
    <div className="flex w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_18rem)] flex-1 flex-col md:gap-8 py-10">
        <div className="border-b">
          <div className="grid w-full max-w-6xl gap-2 mx-auto px-10">
            <h1 className="text-3xl font-semibold pb-8">Settings</h1>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-start md:gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] md:px-10">
          <nav className="md:grid hidden gap-1 text-sm text-muted-foreground">
            {NavigationLinks.map((title) => (
              <MenuLink key={title} title={title} />
            ))}
          </nav>

          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
