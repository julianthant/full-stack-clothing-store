import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full rounded-3xl">
      {children}
      <div className="flex items-center justify-center pb-6">
        <Link
          className="text-sm font-semibold hover:underline underline-offset-4"
          href="/settings/account/addresses"
        >
          Back to Settings
        </Link>
      </div>
    </div>
  );
};

export default Layout;
