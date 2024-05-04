import { BrandsComponent } from './_components/homepage-components/BrandsComponent';
import { HeadingComponent } from './_components/homepage-components/HeadingComponent';
import { DressStyleComponent } from './_components/homepage-components/DressStyleComponent';
import { NewArrivalsComponent } from './_components/homepage-components/NewArrivalsComponent';
import { TopSellingComponent } from './_components/homepage-components/TopSellingComponent';

import { Divider } from '@nextui-org/react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { getClothes } from '@/server/get-user-data/get-clothes';

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
