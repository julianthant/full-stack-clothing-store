import { ClothesComponent } from '../../../../components/utils/ClothesComponent';
import { Button } from '../../../../components/ui/button';
import Link from 'next/link';
import { IntegralCF } from '@/app/fonts/fonts';

export const NewArrivalsComponent = ({}) => {
  const clothes = [
    {
      id: 1,
      name: 'T-shirt with Tape Details',
      price: '$20.00',
      image:
        'https://utfs.io/f/cdbcca1e-f99b-4058-9aef-ac5f28d14ede-9el43q.webp',
    },
    {
      id: 2,
      name: 'Skinny Fit Jeans',
      price: '$25.00',
      image:
        'https://utfs.io/f/43e29efe-99b3-4749-8a83-14c468bb4717-ecsyn4.webp',
    },
    {
      id: 3,
      name: 'Checkered Shirt',
      price: '$30.00',
      image:
        'https://utfs.io/f/257fcd23-44b4-4fdb-95da-ca4257b6ce98-9el43p.webp',
    },
    {
      id: 4,
      name: 'Sleeve Striped T-shirt',
      price: '$35.00',
      image:
        'https://utfs.io/f/b68cb261-ef8c-46fa-ac63-00e2e417e691-9el43o.webp',
    },
  ];

  return (
    <div className="container lg:space-y-14 space-y-7 flex flex-col lg:mt-5">
      <h1
        className={`lg:text-5xl md:text-4xl text-3xl font-bold ${IntegralCF.className} text-center`}
      >
        NEW ARRIVALS
      </h1>
      <div className="flex gap-x-5 max-lg:max-w-max max-lg:overflow-x-scroll scroll-smooth">
        {clothes.map((item) => (
          <ClothesComponent
            key={item.id}
            ID={item.id.toString()}
            Name={item.name}
            Price={item.price}
            ItemImage={item.image}
          />
        ))}
      </div>

      <Button
        asChild
        variant={'outline'}
        className="rounded-full px-20 lg:h-14 h-10 sm:w-min w-full self-center"
      >
        <Link href={'/shop'}>View All</Link>
      </Button>
    </div>
  );
};
