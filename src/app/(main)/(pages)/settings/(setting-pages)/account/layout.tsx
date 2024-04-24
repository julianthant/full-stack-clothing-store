import { FC, ReactNode } from 'react';
import { SubLink } from '@/components/utils/SubLink';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const subPages = ['Profile', 'Login-&-Security', 'Payments', 'Addresses'];
  return (
    <div>
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 pl-6 lg:pr-9 pr-3.5 lg:h-[60px] rounded-tr-[20px] max-md:rounded-tl-[20px]">
        <nav className="hidden flex-col gap-3 text-lg font-medium lg:flex lg:flex-row md:items-center md:text-sm lg:gap-2">
          {subPages.map((link) => (
            <Button key={link} asChild variant="ghost">
              <SubLink title={link} path={`account/${link.toLowerCase()}`} />
            </Button>
          ))}
        </nav>

        <div className="relative ml-auto md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground " />
          <Input
            type="search"
            placeholder="Search..."
            className="rounded-lg bg-background pl-8 md:w-[160px] xl:w-[320px] sm:w-[300px]"
          />
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-10 max-h-min">
        {children}
      </main>
    </div>
  );
};

export default Layout;
