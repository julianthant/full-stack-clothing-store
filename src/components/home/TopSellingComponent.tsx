import { ClothesComponent } from '../utils/ClothesComponent';
import { Button } from '../ui/button';
import Link from 'next/link';

export const TopSellingComponent = ({}) => {
  const clothes = [
    {
      id: 1,
      name: 'T-shirt with Tape Details',
      price: '20',
      image:
        'https://utfs.io/f/b4618a13-9d47-4771-8a2e-3a91615e8a2e-9el43o.png',
      rating: '4.5',
    },
    {
      id: 2,
      name: 'Skinny Fit Jeans',
      price: '25',
      image:
        'https://utfs.io/f/b5104dc4-d584-4934-9637-29fe30528bac-ecsyn4.png',
      rating: '4',
    },
    {
      id: 3,
      name: 'Checkered Shirt',
      price: '30',
      image:
        'https://utfs.io/f/3349146c-0257-41c9-af50-b312191f7a72-9el43p.png',
      rating: '3.5',
    },
    {
      id: 4,
      name: 'Sleeve Striped T-shirt',
      price: '35',
      image:
        'https://utfs.io/f/b4618a13-9d47-4771-8a2e-3a91615e8a2e-9el43o.png',
      rating: '2',
    },
  ];

  return (
    <div className="container lg:space-y-14 space-y-7 flex flex-col lg:mt-5">
      <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold bold-integral text-center">
        TOP SELLING
      </h1>
      <div className="flex gap-x-5 max-lg:max-w-max max-lg:overflow-x-scroll scroll-smooth">
        {clothes.map((item) => (
          <ClothesComponent
            key={item.id}
            Name={item.name}
            Price={item.price}
            ItemImage={item.image}
            Rating={item.rating}
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
