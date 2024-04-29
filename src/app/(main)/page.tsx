import { BrandsComponent } from './_components/homepage/BrandsComponent';
import { HeadingComponent } from './_components/homepage/HeadingComponent';
import { DressStyleComponent } from './_components/homepage/DressStyleComponent';
import { NewArrivalsComponent } from './_components/homepage/NewArrivalsComponent';
import { TopSellingComponent } from './_components/homepage/TopSellingComponent';

import { Divider } from '@nextui-org/react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getClothes } from '@/server/data/getClothes';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryFn: async () => getClothes(0, 6993, 8, 'freshness'),
    queryKey: ['landing-page-new-arrivals'],
    staleTime: Infinity,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="grid gap-16">
        <div>
          <HeadingComponent />
          <BrandsComponent />
        </div>

        <NewArrivalsComponent />

        <div className="main-container">
          <Divider />
        </div>

        <TopSellingComponent />
        <DressStyleComponent />
      </section>
    </HydrationBoundary>
  );
}
