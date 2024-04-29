import { BrandsComponent } from './_components/homepage/BrandsComponent';
import { HeadingComponent } from './_components/homepage/HeadingComponent';
import { DressStyleComponent } from './_components/homepage/DressStyleComponent';
import { NewArrivalsComponent } from './_components/homepage/NewArrivalsComponent';
import { TopSellingComponent } from './_components/homepage/TopSellingComponent';

import { Divider } from '@nextui-org/react';

export default function Home() {
  return (
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
  );
}
