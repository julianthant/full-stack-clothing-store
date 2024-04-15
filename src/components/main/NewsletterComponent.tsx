'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '@nextui-org/react';
import { Icons } from '../utils/Icons';

export const NewsletterComponent = ({}) => {
  return (
    <div className="absolute container lg:top-[-256px] sm:top-[-282px] top-[-296px] left-0">
      <div className="bg-black rounded-[23px] flex items-center justify-between lg:h-48 lg:px-20 max-lg:flex-col max-lg:py-6 max-lg:gap-y-4 max-sm:px-4">
        <div className="lg:w-[600px] lg:px-0 lg:text-left md:px-8 sm:text-center ">
          <p className="text-white lg:text-5xl sm:text-4xl text-3xl font-black">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </p>
        </div>

        <div className="space-y-3 max-lg:w-full px-0 max-lg:px-24 max-md:px-8 max-sm:px-0">
          <Input
            type="email"
            placeholder="Enter your email address"
            classNames={{
              inputWrapper:
                'rounded-full lg:w-[350px] w-full lg:h-[48px] h-[44px] bg-white',
            }}
            startContent={
              <Icons.mailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Button
            variant={'outline'}
            className="bg-white text-black rounded-full lg:w-[350px] w-full lg:h-12 h-11"
          >
            <Link href={'/'}>Subscribe to Newsletter</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
