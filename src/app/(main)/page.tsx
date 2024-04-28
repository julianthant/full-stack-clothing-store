import dynamic from 'next/dynamic';

import { BrandsComponent } from './_components/homepage/BrandsComponent';
import { HeadingComponent } from './_components/homepage/HeadingComponent';

const CustomerFeedbackComponent = dynamic(() =>
  import('./_components/homepage/CustomerFeedbackComponent').then(
    (mod) => mod.CustomerFeedbackComponent
  )
);
const DressStyleComponent = dynamic(() =>
  import('./_components/homepage/DressStyleComponent').then(
    (mod) => mod.DressStyleComponent
  )
);
const NewArrivalsComponent = dynamic(() =>
  import('./_components/homepage/NewArrivalsComponent').then(
    (mod) => mod.NewArrivalsComponent
  )
);
const TopSellingComponent = dynamic(() =>
  import('./_components/homepage/TopSellingComponent').then(
    (mod) => mod.TopSellingComponent
  )
);

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
