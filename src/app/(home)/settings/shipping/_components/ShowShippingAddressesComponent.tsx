'use client';
import axios from 'axios';

import { useSuspenseQuery } from '@tanstack/react-query';
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
    queryKey: ['addresses', userId],
    staleTime: Infinity,
  });

  return (
    <div className="space-y-4">
      {isFetched &&
        shippingAddresses?.map((shippingAddress: Address, index: number) => (
          <ShippingAddressComponent
            key={shippingAddress.id}
            shippingAddress={shippingAddress}
            refetch={refetch}
            index={index}
            userName={userName}
            userId={userId}
          />
        ))}
    </div>
  );
};
