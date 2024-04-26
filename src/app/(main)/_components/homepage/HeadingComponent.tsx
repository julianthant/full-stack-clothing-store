import Image from 'next/image';

import { Icons } from '../../../../components/utils/Icons';
import { Button } from '../../../../components/ui/button';
import { Divider } from '@nextui-org/react';

import Link from 'next/link';
import { IntegralCF } from '@/app/fonts/fonts';

export const HeadingComponent = ({}) => {
  return (
    <div className="w-full bg-foreground-100">
      <div className="container xl:flex xl:justify-between grid place-items-center">
        <div className="flex items-center justify-start sm:w-[560px] w-full xl:py-20 pb-20 max-xl:pt-12 max-md:pt-8 max-sm:pt-4">
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1
                  className={`sm:text-6xl text-4xl font-bold ${IntegralCF.className} font-black`}
                >
                  FIND CLOTHES THAT MATCHES YOUR STYLE
                </h1>
                <p className="text-base text-foreground-400 font-light">
                  Browse through our diverse range of meticulously crafted
                  garments, designed to bring out your individuality and cater
                  to your sense of style.
                </p>
              </div>
              <Button asChild className="rounded-full px-12 h-12 max-sm:w-full">
                <Link href={'/shop'}>Shop Now</Link>
              </Button>
            </div>

            <div className="h-20 flex items-center sm:justify-start justify-center gap-6 w-min max-sm:flex-wrap">
              <div className="h-20 flex items-center justify-start sm:gap-6 gap-4">
                <div>
                  <h2 className="xl:text-4xl md:text-3xl text-[27px] font-semibold">
                    200+
                  </h2>
                  <p className="text-base font-light text-foreground-400 text-nowrap">
                    International Brands
                  </p>
                </div>

                <Divider orientation="vertical" className="w-[2px] h-16" />

                <div>
                  <h2 className="xl:text-4xl md:text-3xl text-[27px] font-semibold">
                    2000+
                  </h2>
                  <p className="text-base font-light text-foreground-400 text-nowrap">
                    High-Quality Products
                  </p>
                </div>
              </div>

              <Divider
                orientation="vertical"
                className="max-sm:hidden w-[2px] h-16"
              />

              <div>
                <h2 className="xl:text-4xl md:text-3xl text-[27px] font-semibold">
                  30,000+
                </h2>
                <p className="text-base font-light text-foreground-400 text-nowrap">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="self-end relative">
          <Image
            src="https://utfs.io/f/58cf1ba9-e2aa-4683-86e4-fb435245d884-u8xd3t.webp"
            alt="HeadingImage"
            width={600}
            height={632}
            fetchPriority="high"
            loading="eager"
            quality={100}
            priority
          />
          <div className="absolute sm:top-[17rem] top-28 left-0">
            <Icons.headingStar className="w-14" />
          </div>

          <div className="absolute sm:top-20 top-8 xl:right-0 sm:left-[500px] right-0">
            <Icons.headingStar className="max-sm:w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};
