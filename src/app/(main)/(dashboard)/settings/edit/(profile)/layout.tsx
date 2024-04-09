import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid gap-5">
      {children}
      <div className="flex items-center justify-center">
        <Link
          className="text-sm font-semibold hover:underline underline-offset-4"
          href="/settings?menu=Account&subMenu=Profiles"
        >
          Back to Settings
        </Link>
      </div>
    </div>
  );
};

export default Layout;
