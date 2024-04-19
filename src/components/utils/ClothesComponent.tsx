import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type ClothesComponentProps = {
  Name: string;
  Price: string;
  ItemImage: string;
  Rating: string;
  HoverImage?: string;
};

export const ClothesComponent = ({
  Name,
  Price,
  ItemImage,
  Rating,
  HoverImage,
}: ClothesComponentProps) => {
  return (
    <div className="lg:gap-5 gap-2 grid">
      <div className="w-full relative">
        <Image
          src={ItemImage}
          alt={Name}
          width={360}
          height={360}
          className={cn('hover:cursor-pointer z-10 transition-opacity', {
            'hover:opacity-0': HoverImage,
          })}
          priority
          loading="eager"
          quality={100}
        />

        {HoverImage && (
          <Image
            src={HoverImage}
            alt={Name}
            width={360}
            height={360}
            className="hover:cursor-pointer absolute inset-0 opacity-0 transition-opacity hover:opacity-100 z-20"
            priority
            loading="eager"
            quality={100}
          />
        )}
      </div>

      <div className="space-y-2">
        <Link href={''} className="text-sm font-light">
          {Name}
        </Link>

        <p className="text-sm text-foreground-500 font-bold">{Price}</p>
      </div>
    </div>
  );
};
