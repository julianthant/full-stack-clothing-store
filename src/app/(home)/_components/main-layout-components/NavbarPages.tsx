import { cn } from '@/lib/utils';

export const NavbarPages = () => {
  const pages = [
    'NEW ARRIVALS',
    'SHOES',
    'BRANDS',
    'CLOTHING',
    'ACCESSORIES',
    'PLUS SIZE',
    'SPORTSWEAR',
    'TAILORING',
    'TALL',
    'SALE',
    'MARKETPLACE',
  ];

  return (
    <div className="bg-[#0a0a0a]/80 w-full pr-6 min-[1530px]:pl-4">
      <div
        className={cn(
          'gap-0 font-medium flex overflow-x-scroll scrollbar-hide scroll-smooth mx-auto max-w-[1500px]'
        )}
      >
        {pages.map((page) => (
          <div
            key={page}
            className="hover:bg-[#0a0a0a]/30 h-14 flex items-center px-4 hover:font-medium transition-all hover:cursor-pointer"
          >
            <p className="2xl:text-sm text-xs text-white text-nowrap">{page}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
