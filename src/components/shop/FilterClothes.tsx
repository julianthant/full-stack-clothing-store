'use client';

import { useState } from 'react';
import { Divider } from '@nextui-org/react';
import { Icons } from '../utils/Icons';
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Slider } from '@nextui-org/react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const FilterClothes = () => {
  const [isSliderVisible, setIsSliderVisible] = useState(true);
  const [isColorVisible, setIsColorVisible] = useState(true);
  const [isSizeVisible, setIsSizeVisible] = useState(true);
  const [isDressStyleVisible, setIsDressStyleVisible] = useState(true);

  return (
    <div className="lg:w-[350px] lg:border lg:rounded-[20px] max-h-screen overflow-y-auto scrollbar-hide">
      <div className="px-4 lg:py-7 max-lg:pb-12 grid gap-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Filter</h1>
          <div className="max-lg:hidden">
            <Icons.filterIcon />
          </div>
        </div>

        <Divider />

        <div className="font-light space-y-3 tracking-wide text-foreground-500">
          <button className="flex justify-between items-center hover:pointer w-full">
            <Link href={'/shop'}>T Shirts</Link>
            <ChevronRight className="size-5" />
          </button>
          <button className="flex justify-between items-center hover:pointer w-full">
            <Link href={'/shop'}>Shorts</Link>
            <ChevronRight className="size-5" />
          </button>
          <button className="flex justify-between items-center hover:pointer w-full">
            <Link href={'/shop'}>Jeans</Link>
            <ChevronRight className="size-5" />
          </button>
          <button className="flex justify-between items-center hover:pointer w-full">
            <Link href={'/shop'}>Hoodie</Link>
            <ChevronRight className="size-5" />
          </button>
          <button className="flex justify-between items-center hover:pointer w-full">
            <Link href={'/shop'}>Shirts</Link>
            <ChevronRight className="size-5" />
          </button>
        </div>

        <Divider />

        <div className={cn({ 'space-y-2': isSliderVisible })}>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Price</h1>
            <Button
              variant={'link'}
              className="p-0"
              onClick={() => setIsSliderVisible(!isSliderVisible)}
            >
              {isSliderVisible ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
          <div
            className={cn({
              visible: isSliderVisible,
              hidden: !isSliderVisible,
            })}
          >
            <Slider
              step={10}
              maxValue={1000}
              isDisabled={!isSliderVisible}
              minValue={0}
              defaultValue={[0, 800]}
              showTooltip={true}
              showOutline={true}
              disableThumbScale={true}
              formatOptions={{ style: 'currency', currency: 'USD' }}
              tooltipValueFormatOptions={{
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }}
              classNames={{
                base: 'max-w-md',
                filler: 'bg-black',
                track: 'h-2',
                labelWrapper: 'mb-2',
                thumb: [
                  'transition-size',
                  'bg-black ring-black',
                  'w-4 h-4 after:h-4 after:w-4 after:bg-black',
                  'data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20',
                  'data-[dragging=true]:w-5 data-[dragging=true]:h-5 data-[dragging=true]:after:h-5 data-[dragging=true]:after:w-5',
                ],
              }}
              tooltipProps={{
                offset: 10,
                placement: 'bottom',
                classNames: {
                  base: ['before:bg-black'],
                  content: ['py-2 shadow-xl', 'text-white bg-black'],
                },
              }}
            />
          </div>
        </div>

        <Divider />

        <div className={cn({ 'space-y-2': isColorVisible })}>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Colors</h1>
            <Button
              variant={'link'}
              className="p-0"
              onClick={() => setIsColorVisible(!isColorVisible)}
            >
              {isColorVisible ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
          <div
            className={cn(
              'grid grid-cols-5 grid-rows-2 gap-y-2 flex-wrap w-full justify-items-center items-center',
              {
                visible: isColorVisible,
                hidden: !isColorVisible,
              }
            )}
          >
            <div className="h-10 w-10 bg-red-500 rounded-full" />
            <div className="h-10 w-10 bg-white border rounded-full" />
            <div className="h-10 w-10 bg-blue-500 rounded-full" />
            <div className="h-10 w-10 bg-yellow-500 rounded-full" />
            <div className="h-10 w-10 bg-purple-500 rounded-full" />

            <div className="h-10 w-10 bg-orange-500 rounded-full" />
            <div className="h-10 w-10 bg-pink-500 rounded-full" />
            <div className="h-10 w-10 bg-teal-500 rounded-full" />
            <div className="h-10 w-10 bg-gray-500 rounded-full" />
            <div className="h-10 w-10 bg-black rounded-full" />
          </div>
        </div>

        <Divider />

        <div className={cn({ 'space-y-2': isSizeVisible })}>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Sizes</h1>
            <Button
              variant={'link'}
              className="p-0"
              onClick={() => setIsSizeVisible(!isSizeVisible)}
            >
              {isSizeVisible ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
          <div
            className={cn(
              'flex gap-2.5 flex-wrap w-full justify-items-center items-center',
              {
                visible: isSizeVisible,
                hidden: !isSizeVisible,
              }
            )}
          >
            <Button
              variant={'secondary'}
              className="rounded-full text-white bg-black hover:bg-black"
            >
              XX-Small
            </Button>
            <Button variant={'secondary'} className="rounded-full">
              X-Small
            </Button>
            <Button variant={'secondary'} className="rounded-full">
              Small
            </Button>
            <Button variant={'secondary'} className="rounded-full">
              Medium
            </Button>
            <Button variant={'secondary'} className="rounded-full">
              Large
            </Button>
            <Button variant={'secondary'} className="rounded-full">
              X-Large
            </Button>
            <Button variant={'secondary'} className="rounded-full">
              XX-Large
            </Button>
          </div>
        </div>

        <Divider />

        <div className={cn({ 'space-y-2': isDressStyleVisible })}>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Dress Style</h1>
            <Button
              variant={'link'}
              className="p-0"
              onClick={() => setIsDressStyleVisible(!isDressStyleVisible)}
            >
              {isDressStyleVisible ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
          <div
            className={cn(
              'flex gap-2.5 flex-wrap w-full justify-items-center items-center font-light tracking-wide text-foreground-500',
              {
                visible: isDressStyleVisible,
                hidden: !isDressStyleVisible,
              }
            )}
          >
            <button className="flex justify-between items-center hover:pointer w-full">
              <Link href={'/shop'}>Casual</Link>
              <ChevronRight className="size-5" />
            </button>
            <button className="flex justify-between items-center hover:pointer w-full">
              <Link href={'/shop'}>Formal</Link>
              <ChevronRight className="size-5" />
            </button>
            <button className="flex justify-between items-center hover:pointer w-full">
              <Link href={'/shop'}>Party</Link>
              <ChevronRight className="size-5" />
            </button>
            <button className="flex justify-between items-center hover:pointer w-full">
              <Link href={'/shop'}>Gym</Link>
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
