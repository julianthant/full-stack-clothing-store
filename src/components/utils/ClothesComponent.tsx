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
    <div className="flex flex-col gap-y-2">
      <div className="relative flex max-sm:justify-center">
        <Image
          src={ItemImage}
          alt={Name}
          width={375}
          height={477}
          quality={100}
          style={{ objectFit: 'contain' }}
          className={cn('hover:cursor-pointer z-10 transition-opacity', {
            'hover:opacity-0': HoverImage,
          })}
        />

        {HoverImage && (
          <Image
            src={HoverImage}
            alt={Name}
            width={375}
            height={477}
            quality={100}
            style={{ objectFit: 'contain' }}
            className="hover:cursor-pointer absolute inset-0 opacity-0 transition-opacity hover:opacity-100 z-20"
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
