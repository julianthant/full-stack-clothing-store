'use client';

import axios from 'axios';
import dynamic from 'next/dynamic';

import { useEffect } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { AddressCards } from './AddressCards';
import { AddressComponentSkeleton } from '@/components/skeleton/AddressComponentSkeleton';

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
      {!isFetched ? (
        <AddressComponentSkeleton />
      ) : (
        <AddressCards addresses={addresses} />
      )}
    </>
  );
};
