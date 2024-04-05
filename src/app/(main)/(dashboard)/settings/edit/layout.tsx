import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="mx-auto w-fit min-h-[300px]">
      <div className="grid space-y-3 border p-10 rounded-3xl mt-20">
        <div className="flex items-center justify-center">{children}</div>

        <Link
          className="text-center text-sm font-semibold mx-auto hover:underline underline-offset-4"
          href="/settings?memu=Account"
        >
          Back to Settings
        </Link>
      </div>
    </div>
  );
};

export default Layout;
