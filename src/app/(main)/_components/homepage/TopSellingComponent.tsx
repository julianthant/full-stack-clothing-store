'use client';

import { ClothesComponent } from '@/components/utils/ClothesComponent';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { cn } from '@/lib/utils';

export const TopSellingComponent = () => {
  const { data: clothes, isFetching } = useQuery({
    queryFn: async () => {
      const options = {
        method: 'GET',
        url: 'https://asos2.p.rapidapi.com/products/v2/list',
        params: {
          store: 'US',
          offset: 0,
          categoryId: 6993,
          limit: 8,
          country: 'US',
          sort: 'freshness',
          currency: 'USD',
          sizeSchema: 'US',
          lang: 'en-US',
        },
        headers: {
          'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'asos2.p.rapidapi.com',
        },
      };

      return axios.request(options).then((res) => res.data);
    },
    queryKey: ['landing-page-new-arrivals'],
  });

  return (
    <div className="main-container lg:space-y-10 space-y-7 flex flex-col lg:mt-5">
      <h1 className="lg:text-3xl md:text-4xl text-3xl font-bold text-center tracking-wide">
        TOP SELLING
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 min-[400px]:grid-cols-2 gap-4">
        {!isFetching &&
          clothes.products.map((product: any) => (
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
