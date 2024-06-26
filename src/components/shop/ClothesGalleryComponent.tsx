'use client';

import { useQuery } from '@tanstack/react-query';
import { ClothesComponent } from '../utils/ClothesComponent';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { Command, CommandItem } from '@/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Divider, Spinner } from '@nextui-org/react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Check, ChevronDown } from 'lucide-react';
import { CommandList } from 'cmdk';
import { Icons } from '../utils/Icons';
import { FilterClothes } from './FilterClothes';
import { getClothes } from '@/server/get-user-data/get-clothes';

export const ClothesGalleryComponent = () => {
  const router = useRouter();
  const params = useSearchParams();

  const cid = params.get('cid') ?? '3602';
  const page = params.get('page') ?? '1';
  const sort = params.get('sort') ?? '';
  const per_page = params.get('per_page') ?? '20';

  const offset = (parseInt(page) - 1) * parseInt(per_page);

  const [open, setOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState(sort);

  const {
    data: clothes,
    refetch,
    isFetching,
    isRefetching,
  } = useQuery({
    queryFn: async () =>
      await getClothes(offset, parseInt(cid), parseInt(cid), currentSort),
    queryKey: ['clothes'],
    refetchOnReconnect: false,
  });

  useEffect(() => {
    (async () => {
      await refetch();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSort]);

  const commandItems = [
    { key: '', value: 'Recommended' },
    { key: 'freshness', value: "What's New" },
    { key: 'priceasc', value: 'Price: Low to High' },
    { key: 'pricedesc', value: 'Price: High to Low' },
  ];

  return (
    <div className="space-y-4 w-full">
      {(isFetching || isRefetching) && (
        <div className="fixed inset-0 flex items-center justify-center bg-foreground-50/80 z-50">
          <Spinner size="lg" />
        </div>
      )}
      {!clothes && <div className="h-[500px]" />}
      {clothes && (
        <>
          <div className="sm:flex max-sm:space-y-2 justify-between items-center">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-3xl font-bold">Men&apos;s Clothing</h1>
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant={'secondary'}
                    className="w-9 h-9 p-2.5 rounded-full sm:hidden flex items-center justify-center"
                  >
                    <Icons.filterIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <FilterClothes />
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex gap-4 text-nowrap">
              <p className="text-sm tracking-wider text-foreground-500">
                Showing {offset + 1}-{offset + 1 + parseInt(per_page)} of{' '}
                {clothes.itemCount} Products
              </p>
              <div className="flex gap-1 max-md:hidden">
                <p className="text-sm tracking-wider text-foreground-500">
                  Sort by:
                </p>
                <Popover
                  open={open}
                  onOpenChange={setOpen}
                  aria-label="Sort options popover"
                >
                  <PopoverTrigger asChild aria-label="Sort options trigger">
                    <Button
                      role="combobox"
                      aria-expanded={open}
                      aria-label="sort"
                      className="w-min justify-between p-0 h-min bg-transparent text-black shadow-none hover:bg-transparent tracking-wider"
                    >
                      {commandItems.find((item) => item.key === sort)?.value}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandList>
                        {commandItems &&
                          commandItems.map((command) => (
                            <CommandItem
                              className="hover:cursor-pointer"
                              key={command.value}
                              value={command.key}
                              onSelect={(currentSort) => {
                                router.push(
                                  `/shop?page=${page}&per_page=${per_page}&cid=${cid}&sort=${currentSort}`
                                );
                                setCurrentSort(currentSort);
                                setOpen(false);
                              }}
                            >
                              {command.value}
                              <Check
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  sort === command.key
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
            {clothes?.products?.map((product: any) => (
              <ClothesComponent
                key={product.id}
                ID={product.id}
                Name={product.name}
                Price={product.price.current.text}
                ItemImage={`https://${product.imageUrl}`}
                HoverImage={`https://${product.additionalImageUrls[0]}`}
              />
            ))}
          </div>

          <Divider />

          <Pagination className="w-full">
            <PaginationContent className="flex w-full justify-between items-center">
              <PaginationItem>
                <PaginationPrevious
                  href={`/shop?page=${Math.max(
                    parseInt(page) - 1,
                    0
                  )}&per_page=${per_page}&cid=${cid} `}
                  className="border"
                />
              </PaginationItem>

              <div className="flex gap-2 items-center text-foreground-400">
                <PaginationItem>
                  <PaginationLink
                    href={`/shop?page=1&per_page=${per_page}&cid=${cid}`}
                    className={cn({ 'bg-muted text-black': page === '1' })}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="max-sm:hidden">
                  <PaginationLink
                    href={`/shop?page=2&per_page=${per_page}&cid=${cid}`}
                    className={cn({ 'bg-muted text-black': page === '2' })}
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="max-sm:hidden">
                  <PaginationLink
                    href={`/shop?page=3&per_page=${per_page}&cid=${cid}`}
                    className={cn({
                      'bg-muted text-black ': page === '3',
                    })}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem className="max-sm:hidden">
                  <PaginationLink
                    className={cn({
                      'bg-muted text-black':
                        parseInt(page) ===
                        Math.floor(clothes.itemCount / parseInt(per_page)) - 2,
                    })}
                    href={`/shop?page=${
                      Math.floor(clothes.itemCount / parseInt(per_page)) - 2
                    }&per_page=${per_page}&cid=${cid}`}
                  >
                    {Math.floor(clothes.itemCount / parseInt(per_page)) - 2}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className="max-sm:hidden">
                  <PaginationLink
                    className={cn({
                      'bg-muted text-black':
                        parseInt(page) ===
                        Math.floor(clothes.itemCount / parseInt(per_page)) - 1,
                    })}
                    href={`/shop?page=${
                      Math.floor(clothes.itemCount / parseInt(per_page)) - 1
                    }&per_page=${per_page}&cid=${cid}`}
                  >
                    {Math.floor(clothes.itemCount / parseInt(per_page)) - 1}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    className={cn({
                      'bg-muted text-black':
                        parseInt(page) ===
                        Math.floor(clothes.itemCount / parseInt(per_page)),
                    })}
                    href={`/shop?page=${Math.floor(
                      clothes.itemCount / parseInt(per_page)
                    )}&per_page=${per_page}&cid=${cid}`}
                  >
                    {Math.floor(clothes.itemCount / parseInt(per_page))}
                  </PaginationLink>
                </PaginationItem>
              </div>

              <PaginationItem>
                <PaginationNext
                  href={`/shop?page=${
                    parseInt(page) + 1
                  }&per_page=${per_page}&cid=${cid} `}
                  className="border"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};
