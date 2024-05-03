'use client';
import axios from 'axios';

import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { SettingsCardSkeleton } from '@/components/skeleton/SettingsCardsSkeleton';
import { PaymentMethodComponent } from './PaymentMethodComponent';

export const ShowPaymentMethodsComponent = ({ userId }: any) => {
  const {
    data: paymentMethods,
    refetch,
    isFetched,
  } = useSuspenseQuery({
    queryFn: async () => {
      return await axios
        .get(`/api/payments/getAll/${userId}`)
        .then((res) => res.data);
    },
    queryKey: ['payment-methods', userId],
    staleTime: Infinity,
  });

  return (
    <div className="space-y-4">
      {isFetched &&
        paymentMethods?.map((paymentMethod: PaymentMethod) => (
          <Suspense key={paymentMethod.id} fallback={<SettingsCardSkeleton />}>
            <PaymentMethodComponent
              paymentMethod={paymentMethod}
              refetch={refetch}
            />
          </Suspense>
        ))}
    </div>
  );
};
