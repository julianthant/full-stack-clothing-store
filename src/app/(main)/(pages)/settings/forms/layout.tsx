import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto w-fit min-h-[300px]">
      <div className="grid space-y-3 border p-10 rounded-3xl mt-6">
        <div className="flex items-center justify-center">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
