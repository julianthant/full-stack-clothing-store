import dynamic from 'next/dynamic';

import { PaymentComponentSkeleton } from '@/components/skeleton/PaymentComponentSkeleton';

const PaymentComponent = dynamic(
  () =>
    import('./_components/PaymentComponent').then(
      (mod) => mod.PaymentComponent
    ),
  { ssr: false, loading: () => <PaymentComponentSkeleton /> }
);

const page = () => {
  return (
    <div className="min-h-[390px]">
      <PaymentComponent />
    </div>
  );
};

export default page;
