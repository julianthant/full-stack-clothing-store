import { FC, ReactNode, Suspense } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

export default Layout;
