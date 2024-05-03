'use client';
import axios from 'axios';

import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { SettingsCardSkeleton } from '@/components/skeleton/SettingsCardsSkeleton';
import { ShippingAddressComponent } from './ShippingAddressComponent';

export const ShowShippingAddressesComponent = ({ userId, userName }: any) => {
  const {
    data: shippingAddresses,
    refetch,
    isFetched,
  } = useSuspenseQuery({
    queryFn: async () => {
      return await axios
        .get(`/api/addresses/getAll/${userId}`)
        .then((res) => res.data);
    },
    queryKey: ['payment-methods', userId],
    staleTime: Infinity,
  });

  return (
    <div className="space-y-4">
      {isFetched &&
        shippingAddresses?.map((shippingAddress: Address, index: number) => (
          <Suspense
            key={shippingAddress.id}
            fallback={<SettingsCardSkeleton />}
          >
            <ShippingAddressComponent
              shippingAddress={shippingAddress}
              refetch={refetch}
              index={index}
              userName={userName}
            />
          </Suspense>
        ))}
    </div>
  );
};
