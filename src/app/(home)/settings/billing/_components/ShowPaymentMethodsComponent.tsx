'use client';

import axios from 'axios';
import dynamic from 'next/dynamic';

import { useSuspenseQuery } from '@tanstack/react-query';
import { SettingsCardSkeleton } from '@/components/skeleton/SettingsCardsSkeleton';

const PaymentMethodComponent = dynamic(
  () =>
    import('./AddPaymentMethodDrawer').then(
      (mod) => mod.AddPaymentMethodDrawer
    ),
  {
    ssr: false,
    loading: () => <SettingsCardSkeleton />,
  }
);

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
          <PaymentMethodComponent
            key={paymentMethod.id}
            paymentMethod={paymentMethod}
            refetch={refetch}
            userId={userId}
          />
        ))}
    </div>
  );
};
