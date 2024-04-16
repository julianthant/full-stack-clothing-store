import Shirt1 from '../images/Shirt-1.png';
import Shirt2 from '../images/Shirt-2.png';
import Shirt3 from '../images/Shirt-3.png';
import Pants1 from '../images/Pants-1.png';

import { ClothesComponent } from '../utils/ClothesComponent';
import { Button } from '../ui/button';
import Link from 'next/link';

export const TopSellingComponent = ({}) => {
  const clothes = [
    {
      id: 1,
      name: 'T-shirt with Tape Details',
      price: '20',
      image: Shirt3,
      rating: '4.5',
    },
    {
      id: 2,
      name: 'Skinny Fit Jeans',
      price: '25',
      image: Pants1,
      rating: '4',
    },
    {
      id: 3,
      name: 'Checkered Shirt',
      price: '30',
      image: Shirt2,
      rating: '3.5',
    },
    {
      id: 4,
      name: 'Sleeve Striped T-shirt',
      price: '35',
      image: Shirt1,
      rating: '2',
    },
  ];
  return (
    <div className="container lg:space-y-14 space-y-7 flex flex-col lg:mt-5">
      <h1 className="lg:text-5xl text-3xl font-black text-center">
        TOP SELLING
      </h1>
      <div className="flex gap-x-5 max-lg:max-w-max overflow-x-scroll overflow-visible">
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
