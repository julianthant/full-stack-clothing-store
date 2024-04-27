import { FC, ReactNode } from 'react';
import { NavbarComponent } from './_components/main/Navbar';
import { SessionProvider } from 'next-auth/react';
import { currentUser } from '@/lib/server-auth';
import { Footer } from './_components/main/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const user = await currentUser();

  return (
    <SessionProvider>
      <NavbarComponent user={user} />

      {children}

      <Footer />
    </SessionProvider>
  );
};

export default Layout;
