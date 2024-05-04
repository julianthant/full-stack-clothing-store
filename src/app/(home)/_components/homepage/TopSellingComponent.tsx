'use client';

import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getClothes } from '@/server/get-user-data/get-clothes';
import { ClothesComponent } from '@/components/utils/ClothesComponent';

export const TopSellingComponent = () => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 1025px)' });

  const {
    data: clothes,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => getClothes(0, 6993, 8, 'freshness'),
    queryKey: ['landing-page-new-arrivals'],
    refetchOnReconnect: false,
  });

  const formattedClothes = isSmallScreen
    ? clothes?.products.slice(0, 6)
    : clothes?.products;

  return (
    <div className="main-container lg:space-y-10 space-y-7 flex flex-col lg:mt-5">
      <h1 className="lg:text-3xl md:text-4xl text-3xl font-bold text-center tracking-wide">
        TOP SELLING
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 min-[400px]:grid-cols-2 gap-4">
        {!isLoading &&
          !isError &&
          formattedClothes?.map((product: any) => (
            <ClothesComponent
              key={product.id}
              ID={product.id}
              Name={product.name}
              Price={product.price.current.text}
              ItemImage={`https://${product.imageUrl}`}
              HoverImage={`https://${product.additionalImageUrls[0]}`}
            />
          ))}
      </div>

      <Button
        asChild
        variant={'outline'}
        className={cn(
          'w-40 mx-auto rounded-none border-3 border-gray-500 py-2'
        )}
      >
        <Link href={'/shop'}>SEE MORE</Link>
      </Button>
    </div>
  );
};
