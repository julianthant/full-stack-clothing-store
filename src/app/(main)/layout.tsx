import { FC, ReactNode } from 'react';
import Navbar from '@/components/main/Navbar';
import { SessionProvider } from 'next-auth/react';
import { BreadCrumbs } from '@/components/ui/bread-crumbs';

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
    </SessionProvider>
  );
};

export default Layout;
