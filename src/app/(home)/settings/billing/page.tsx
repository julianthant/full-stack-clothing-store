import Link from 'next/link';
import dynamic from 'next/dynamic';

import { currentUser } from '@/lib/server-auth';
import { SettingsCardSkeleton } from '@/components/skeleton/SettingsCardsSkeleton';

import { ChevronLeft } from 'lucide-react';

const AddPaymentMethodComponent = dynamic(
  () =>
    import('./_components/AddPaymentMethodComponent').then(
      (mod) => mod.AddPaymentMethodComponent
    ),
  { ssr: false, loading: () => <SettingsCardSkeleton /> }
);

const ShowPaymentMethodsComponent = dynamic(
  () =>
    import('./_components/ShowPaymentMethodsComponent').then(
      (mod) => mod.ShowPaymentMethodsComponent
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
        <AddPaymentMethodComponent user={user} />
        <ShowPaymentMethodsComponent userId={user?.id} />
      </div>
    </div>
  );
};

export default page;
