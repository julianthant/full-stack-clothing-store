import { BrandsComponent } from '@/components/home/BrandsComponent';
import { HeadingComponent } from '@/components/home/HeadingComponent';
import { NewArrivalsComponent } from '@/components/home/NewArrivalsComponent';
import { TopSellingComponent } from '@/components/home/TopSellingComponent';
import { Divider } from '@nextui-org/react';

export default function Home() {
  return (
    <section className="grid gap-16">
      <div>
        <HeadingComponent />
        <BrandsComponent />
      </div>

      <NewArrivalsComponent />

      <div className="container">
        <Divider />
      </div>

      <TopSellingComponent />
    </section>
  );
}
