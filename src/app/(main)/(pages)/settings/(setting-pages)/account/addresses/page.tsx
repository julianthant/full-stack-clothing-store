import Link from 'next/link';
import dynamic from 'next/dynamic';

import { PlusIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { AddressComponentSkeleton } from '@/components/skeleton/AddressComponentSkeleton';

const AddressComponent = dynamic(
  () =>
    import('./_components/AdresssComponent').then(
      (mod) => mod.AddressComponent
    ),
  { ssr: false, loading: () => <AddressComponentSkeleton /> }
);

const page = () => {
  return (
    <div className="lg:grid flex flex-col gap-4 relative 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 dark:bg-black max-lg:min-h-[700px]">
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

      <AddressComponent />
    </div>
  );
};

export default page;
