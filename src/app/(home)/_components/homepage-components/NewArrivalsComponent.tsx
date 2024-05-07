import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import { ClothesCarousel } from './ClothesCarousel';
import { Button } from '@/components/ui/button';

export const NewArrivalsComponent = () => {
  return (
    <div className="main-container lg:space-y-10 space-y-7 flex flex-col lg:mt-5">
      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-bold text-center tracking-wide">
          NEW ARRIVALS
        </h1>

        <Link href={'/shop'} className="link-animation max-xs:hidden">
          <span className="flex items-center gap-2">
            More Products <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

      <ClothesCarousel />

      <Button className="xs:hidden">More Products</Button>
    </div>
  );
};
