import Link from 'next/link';
import dynamic from 'next/dynamic';

import { currentUser } from '@/lib/server-auth';
import { SettingsCardSkeleton } from '@/components/skeleton/SettingsCardsSkeleton';

import { ChevronLeft } from 'lucide-react';

const AddShippingAddressComponent = dynamic(
  () =>
    import('./_components/AddShippingAddressComponent').then(
      (mod) => mod.AddShippingAddressComponent
    ),
  { ssr: false, loading: () => <SettingsCardSkeleton /> }
);

const ShowShippingAddressesComponent = dynamic(
  () =>
    import('./_components/ShowShippingAddressesComponent').then(
      (mod) => mod.ShowShippingAddressesComponent
    ),
  { ssr: false, loading: () => <SettingsCardSkeleton /> }
);

const page = async () => {
  const user = await currentUser();

  return (
    <div className="space-y-6">
      <Link
        className="md:hidden py-6 flex items-center gap-2 border-b px-10 tracking-wide font-medium"
        href="/settings"
      >
        <ChevronLeft className="w-5 h-5" /> <span>Settings</span>
      </Link>

      <div className="max-md:px-10 space-y-4">
        <AddShippingAddressComponent user={user} />
        <ShowShippingAddressesComponent
          userId={user?.id}
          userName={user?.name}
        />
      </div>
    </div>
  );
};

export default page;
