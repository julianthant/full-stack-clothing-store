import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container">
      <div className="mx-auto min-h-[300px]">
        <div className="grid space-y-3 border sm:p-10 rounded-3xl mt-6">
          <div className="flex items-center justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
