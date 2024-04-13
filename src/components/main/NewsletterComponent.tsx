'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { Input } from '@nextui-org/react';
import { Icons } from '../utils/Icons';

export const NewsletterComponent = ({}) => {
  return (
    <div className="absolute container top-[-256px] left-0">
      <div className="bg-black rounded-[23px] flex items-center justify-between h-48 px-20">
        <div className="w-[600px]">
          <p className="text-white text-5xl font-black">
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </p>
        </div>

        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Enter your email address"
            classNames={{
              inputWrapper: 'rounded-full w-[350px] h-[48px] bg-white',
            }}
            startContent={
              <Icons.mailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Button
            variant={'outline'}
            className="bg-white text-black rounded-full w-[350px] h-12"
          >
            <Link href={'/'}>Subscribe to Newsletter</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
