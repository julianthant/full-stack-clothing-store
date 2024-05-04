import dynamic from 'next/dynamic';

import { currentUser } from '@/lib/server-auth';
import { SettingsCardSkeleton } from '@/components/skeleton/SettingsCardsSkeleton';

const AvatarChangeForm = dynamic(
  () =>
    import('../general/_components/AvatarChangeForm').then(
      (mod) => mod.AvatarChangeForm
    ),
  { ssr: false, loading: () => <SettingsCardSkeleton /> }
);
const NameChangeForm = dynamic(
  () =>
    import('../general/_components/NameChangeForm').then(
      (mod) => mod.NameChangeForm
    ),
  { ssr: false, loading: () => <SettingsCardSkeleton /> }
);
const CountryChangeForm = dynamic(
  () =>
    import('../general/_components/CountryChangeForm').then(
      (mod) => mod.CountryChangeForm
    ),
  { ssr: false, loading: () => <SettingsCardSkeleton /> }
);
const GenderChangeForm = dynamic(
  () =>
    import('../general/_components/GenderChangeForm').then(
      (mod) => mod.GenderChangeForm
    ),
  { ssr: false, loading: () => <SettingsCardSkeleton /> }
);
const DOBChangeForm = dynamic(
  () =>
    import('../general/_components/DOBChangeForm').then(
      (mod) => mod.DOBChangeForm
    ),
  { ssr: false, loading: () => <SettingsCardSkeleton /> }
);
const PhoneNumberChangeForm = dynamic(
  () =>
    import('../general/_components/PhoneNumberChangeForm').then(
      (mod) => mod.PhoneNumberChangeForm
    ),
  { ssr: false, loading: () => <SettingsCardSkeleton /> }
);
const DeleteAccountForm = dynamic(
  () =>
    import('../general/_components/DeleteAccountForm').then(
      (mod) => mod.DeleteAccountForm
    ),
  { ssr: false, loading: () => <SettingsCardSkeleton /> }
);

export const SettingsDesktopPage = async () => {
  const user = await currentUser();

  return (
    <div className="md:grid gap-6 hidden">
      <AvatarChangeForm UserAvatar={user?.image} />

      <NameChangeForm UserName={user?.name} />

      <CountryChangeForm UserCountry={user?.country} />

      <GenderChangeForm UserGender={user?.gender} />

      <DOBChangeForm UserDOB={user?.dateOfBirth} />

      <PhoneNumberChangeForm UserPhoneNumber={user?.phoneNumber} />

      <DeleteAccountForm />
    </div>
  );
};
