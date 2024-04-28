import { FC, ReactNode } from 'react';
import { BreadCrumbs } from '@/components/ui/bread-crumbs';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="main-container py-5">
        <BreadCrumbs />
      </div>

      {children}
    </div>
  );
};

export default Layout;
