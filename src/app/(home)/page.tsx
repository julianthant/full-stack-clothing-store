import { BrandsComponent } from './_components/homepage-components/BrandsComponent';
import { HeadingComponent } from './_components/homepage-components/HeadingComponent';
import { DressStyleComponent } from './_components/homepage-components/DressStyleComponent';
import { NewArrivalsComponent } from './_components/homepage-components/NewArrivalsComponent';
import { TopSellingComponent } from './_components/homepage-components/TopSellingComponent';

import { Divider } from '@nextui-org/react';

export default async function Home() {
  return (
    <section className="grid gap-16">
      <div>
        <HeadingComponent />
        <BrandsComponent />
      </div>

      <div className="main-container">
        <Divider />
      </div>

      <TopSellingComponent />
      <DressStyleComponent />
    </section>
  );
}
