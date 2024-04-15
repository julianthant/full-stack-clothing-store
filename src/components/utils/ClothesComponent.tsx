import Image, { StaticImageData } from 'next/image';
import { Icons } from './Icons';
import Link from 'next/link';

type ClothesComponentProps = {
  Name: string;
  Price: string;
  ItemImage: StaticImageData;
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
    <div className="flex flex-col gap-5">
      <Image
        src={ItemImage}
        alt={Name}
        width={350}
        height={350}
        className="hover:cursor-pointer"
      />

      <div className="space-y-2">
        <Link
          href={''}
          className="2xl:text-2xl xl:text-xl text-lg font-semibold"
        >
          {Name}
        </Link>

        <div className="flex items-center gap-2">
          {Array.from({ length: parseInt(rating, 10) }, (_, i) => (
            <Icons.star key={i} className="w-max" />
          ))}
          {half && <Icons.halfStar />}
          <p className="text-sm">
            {Rating}/<span className="text-sm text-foreground-400">5</span>
          </p>
        </div>

        <p className="2xl:text-3xl xl:text-2xl text-xl font-bold">${Price}</p>
      </div>
    </div>
  );
};
