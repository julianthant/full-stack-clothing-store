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
    <div className="grid gap-5">
      <div className="hover:cursor-pointer">
        <Image src={ItemImage} alt={Name} width={350} height={350} />
      </div>
      <div className="space-y-2">
        <Link href={''} className="text-2xl font-semibold">
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

        <p className="text-3xl font-bold">${Price}</p>
      </div>
    </div>
  );
};
