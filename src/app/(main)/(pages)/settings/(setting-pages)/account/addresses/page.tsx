import dynamic from 'next/dynamic';

import { AddressComponentSkeleton } from '@/components/skeleton/AddressComponentSkeleton';
import { AddressAddSkeleton } from '@/components/skeleton/AddressAddSkeleton';

const AddressComponent = dynamic(
  () =>
    import('./_components/AdresssComponent').then(
      (mod) => mod.AddressComponent
    ),
  { loading: () => <AddressAddSkeleton /> }
);

const page = () => {
  return (
    <div className="lg:grid flex flex-col gap-4 relative 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 dark:bg-black max-lg:min-h-[700px]">
      <AddressComponent />
    </div>
  );
};

export default page;
