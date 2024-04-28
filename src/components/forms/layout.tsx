import { FC, ReactNode, Suspense } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="main-container">
      <div className="mx-auto min-h-[300px] sm:w-min">
        <div className="grid space-y-3 border sm:p-10 rounded-3xl mt-6">
          <div className="flex items-center justify-center">
            <Suspense fallback={null}>{children}</Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
