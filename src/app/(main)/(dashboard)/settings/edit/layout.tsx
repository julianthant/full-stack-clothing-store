import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[400px] w-full min-h-[300px]">
      <div className="flex items-center justify-center border p-10 rounded-3xl mt-20">
        {children}
      </div>
    </div>
  );
};

export default Layout;
