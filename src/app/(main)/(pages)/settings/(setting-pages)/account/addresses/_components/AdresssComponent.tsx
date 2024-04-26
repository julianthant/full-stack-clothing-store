'use client';

import axios from 'axios';
import dynamic from 'next/dynamic';

import { useEffect } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { AddressComponentSkeleton } from '@/components/skeleton/AddressComponentSkeleton';
import { PlusIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const AddressCards = dynamic(
  () => import('./AddressCards').then((mod) => mod.AddressCards),
  { ssr: false, loading: () => <AddressComponentSkeleton /> }
);

export const AddressComponent = () => {
  const user = useCurrentUser();
  const userId = user?.id;

  const params = useSearchParams();
  const success = params.get('success');

  const router = useRouter();
  const pathname = usePathname();

  const {
    data: addresses,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: () =>
      axios.get(`/api/addresses/getAll/${userId}`).then((res) => res.data),
    queryKey: ['addresses', { userId: userId }],
    staleTime: 1000 * 60 * 10,
    enabled: !!userId,
  });

  useEffect(() => {
    if (success) {
      refetch();
      router.replace(pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <>
      <Card className="rounded-lg p-4 h-[319px]">
        <Link href="/settings/forms/address/add-new-address">
          <CardContent className="hover:bg-foreground-200 bg-foreground-100 cursor-pointer flex flex-col items-center justify-center p-0 rounded-lg h-full border-2 border-dashed border-foreground-400">
            <PlusIcon size={70} className="text-foreground-400 mx-auto" />
            <div className="flex items-center justify-center">
              <p className="text-2xl font-bold text-foreground-600">
                Add Address
              </p>
            </div>
          </CardContent>
        </Link>
      </Card>

      {!isFetched ? (
        <AddressComponentSkeleton />
      ) : (
        <AddressCards addresses={addresses} />
      )}
    </>
  );
};
