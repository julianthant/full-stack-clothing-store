import { currentUser } from '@/lib/server-auth';
import { FC, ReactNode } from 'react';

import { Footer } from './_components/main-layout-components/Footer';
import { NavbarPages } from './_components/main-layout-components/NavbarPages';
import { NavbarComponent } from './_components/main-layout-components/Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const user = await currentUser();

  return (
    <>
      <NavbarComponent user={user} />
      <NavbarPages />

      <div className="bg-muted/40">{children}</div>

      <Footer />
    </>
  );
};

export default Layout;
