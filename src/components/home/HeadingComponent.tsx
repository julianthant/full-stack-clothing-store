import Image from 'next/image';

import { Icons } from '../utils/Icons';
import { Button } from '../ui/button';
import { Divider } from '@nextui-org/react';

import HeadingImage from '../images/HeadingImage.png';
import Link from 'next/link';

export const HeadingComponent = ({}) => {
  return (
    <div className="w-full bg-foreground-100">
      <div className="container flex justify-between">
        <div className="flex items-center justify-start w-[560px] py-20">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-6xl font-black">
                  FIND CLOTHES THAT MATCHES YOUR STYLE
                </h1>
                <p className="text-sm text-foreground-400">
                  Browse through our diverse range of meticulously crafted
                  garments, designed to bring out your individuality and cater
                  to your sense of style.
                </p>
              </div>
              <Button asChild className="rounded-full px-12 h-11">
                <Link href={'/shop'}>Shop Now</Link>
              </Button>
            </div>
            <div className="h-20 flex items-center gap-6">
              <div>
                <h2 className="text-4xl font-semibold">200+</h2>
                <p className="text-sm text-foreground-400">
                  International Brands
                </p>
              </div>

              <Divider orientation="vertical" />

              <div>
                <h2 className="text-4xl font-semibold">2000+</h2>
                <p className="text-sm text-foreground-400">
                  High-Quality Products
                </p>
              </div>

              <Divider orientation="vertical" />

              <div>
                <h2 className="text-4xl font-semibold">30,000+</h2>
                <p className="text-sm text-foreground-400">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="self-end relative">
          <Image
            src={HeadingImage}
            alt="HeadingImage"
            width={'600'}
            fetchPriority="high"
            loading="eager"
            quality={100}
          />
          <div className="absolute top-[17rem] left-0">
            <Icons.headingStar className="w-14" />
          </div>

          <div className="absolute top-20 right-0">
            <Icons.headingStar />
          </div>
        </div>
      </div>
    </div>
  );
};
