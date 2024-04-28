import { FC, ReactNode } from 'react';
import { NavbarComponent } from './_components/main/Navbar';
import { currentUser } from '@/lib/server-auth';
import { Footer } from './_components/main/Footer';
import { NavbarPages } from './_components/main/NavbarPages';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const user = await currentUser();

  return (
    <>
      <NavbarComponent user={user} />
      <NavbarPages />

      {children}

      <Footer />
    </>
  );
};

export default Layout;
