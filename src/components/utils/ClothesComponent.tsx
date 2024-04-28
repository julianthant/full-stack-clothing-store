'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type ClothesComponentProps = {
  ID: string;
  Name: string;
  Price: string;
  ItemImage: string;
  HoverImage?: string;
};

export const ClothesComponent = ({
  ID,
  Name,
  Price,
  ItemImage,
  HoverImage,
}: ClothesComponentProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-2 flex-shrink">
      <div className="relative w-full">
        <Image
          src={ItemImage}
          alt={Name}
          width={471}
          height={600}
          quality={100}
          className={cn('hover:cursor-pointer z-10 transition-opacity w-full', {
            'hover:opacity-0': HoverImage,
          })}
        />

        {HoverImage && (
          <Image
            src={HoverImage}
            alt={Name}
            width={471}
            height={600}
            quality={100}
            className="hover:cursor-pointer absolute inset-0 opacity-0 transition-opacity hover:opacity-100 z-20 w-full"
          />
        )}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-light">{Name}</p>

        <p className="text-sm text-foreground-500 font-bold">{Price}</p>
      </div>
    </div>
  );
};
