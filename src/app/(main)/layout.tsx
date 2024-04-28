import { FC, ReactNode } from 'react';
import { NavbarComponent } from './_components/main/Navbar';
import { SessionProvider } from 'next-auth/react';

import { Footer } from './_components/main/Footer';
import { NavbarPages } from './_components/main/NavbarPages';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  return (
    <SessionProvider>
      <NavbarComponent />
      <NavbarPages />

      {children}

      <Footer />
    </SessionProvider>
  );
};

export default Layout;
