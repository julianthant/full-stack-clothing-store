import Link from 'next/link';
import dynamic from 'next/dynamic';

import { currentUser } from '@/lib/server-auth';
import { SettingsCardSkeleton } from '@/components/skeleton/SettingsCardsSkeleton';

import { ChevronLeft } from 'lucide-react';

const EmailResetForm = dynamic(
  () =>
    import('./_components/EmailResetForm').then((mod) => mod.EmailResetForm),
  { ssr: false, loading: () => <SettingsCardSkeleton /> }
);

const PasswordResetForm = dynamic(
  () =>
    import('./_components/PasswordResetForm').then(
      (mod) => mod.PasswordResetForm
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

      <div className="grid gap-6 max-md:px-10">
        <EmailResetForm UserEmail={user?.email} UserIsOAuth={user?.isOAuth} />
        <PasswordResetForm
          UserEmail={user?.email}
          UserIsOAuth={user?.isOAuth}
        />
      </div>
    </div>
  );
};

export default page;
