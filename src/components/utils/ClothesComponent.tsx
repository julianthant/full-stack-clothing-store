import Image from 'next/image';
import { Icons } from './Icons';
import Link from 'next/link';

type ClothesComponentProps = {
  Name: string;
  Price: string;
  ItemImage: string;
  Rating: string;
};

export const ClothesComponent = ({
  Name,
  Price,
  ItemImage,
  Rating,
}: ClothesComponentProps) => {
  const rating = Rating[0];
  const half = Rating.length > 1;

  return (
    <div className="flex flex-col lg:gap-5 gap-2">
      <div className=" max-lg:w-[200px]">
        <Image
          src={ItemImage}
          alt={Name}
          width={360}
          height={360}
          className="hover:cursor-pointer w-full"
        />
      </div>

      <div className="lg:space-y-2">
        <Link
          href={''}
          className="2xl:text-2xl xl:text-xl lg:text-lg text-sm font-semibold"
        >
          {Name}
        </Link>

        <div className="flex items-center gap-2">
          {Array.from({ length: parseInt(rating, 10) }, (_, i) => (
            <Icons.star key={i} className="lg:w-max w-4" />
          ))}
          {half && <Icons.halfStar className="lg:w-max w-4" />}
          <p className="text-sm">
            {Rating}/<span className="text-sm text-foreground-400">5</span>
          </p>
        </div>

        <p className="2xl:text-3xl xl:text-2xl lg:text-xl text-lg font-bold">
          ${Price}
        </p>
      </div>
    </div>
  );
};
