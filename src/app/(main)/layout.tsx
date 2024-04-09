import { FC, ReactNode } from 'react';
import Navbar from '@/components/main/Navbar';
import { SessionProvider } from 'next-auth/react';
import { BreadCrumbs } from '@/components/ui/bread-crumbs';
import Footer from '@/components/main/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Navbar />

      <div className="container py-5">
        <BreadCrumbs />
      </div>

      {children}

      <Footer />
    </SessionProvider>
  );
};

export default Layout;
