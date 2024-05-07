import Link from 'next/link';

import { Suspense } from 'react';
import { ClothesCarousel } from './ClothesCarousel';
import { ClothesComponentSkeleton } from '@/components/skeleton/ClothesComponentSkeleton';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const TopSellingComponent = () => {
  return (
    <div className="w-[calc(100vw_-_2rem)] mx-auto">
      <div className="flex justify-between items-end max-w-[1500px] mx-auto pb-6 px-4">
        <h1 className="text-2xl font-bold text-center tracking-wide">
          TOP SELLING
        </h1>

        <Link href={'/shop'} className="link-animation max-xs:hidden">
          <span className="flex items-center gap-2">
            More Products <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

      <Suspense fallback={<ClothesComponentSkeleton />}>
        <ClothesCarousel />
      </Suspense>

      <Button className="xs:hidden">More Products</Button>
    </div>
  );
};
