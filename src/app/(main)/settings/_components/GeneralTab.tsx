import { cn } from '@/lib/utils';

import { AvatarIcon } from '@nextui-org/shared-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { NameChangeForm } from '../general/_components/NameChangeForm';
import { CountryChangeForm } from '../general/_components/CountryChangeForm';
import { GenderChangeForm } from '../general/_components/GenderChangeForm';
import { DOBChangeForm } from '../general/_components/DOBChangeForm';
import { PhoneNumberChangeForm } from '../general/_components/PhoneNumberChangeForm';
import DeleteAccountForm from '../general/_components/DeleteAccountForm';

export const GeneralTab = ({ user }: any) => {
  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex items-center justify-between py-3">
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>
              This is your avatar. <br />
              Click on the avatar to upload a custom one from your files.
            </CardDescription>
          </CardHeader>

          <CardContent className={cn('p-0 pr-6')}>
            <Avatar className="w-20 h-20 hover:opacity-90 hover:cursor-pointer">
              <AvatarImage src={user?.image as string} />
              <AvatarFallback>
                <AvatarIcon className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
          </CardContent>
        </div>

        <CardFooter className="border-t px-6 py-3">
          <CardDescription>
            An avatar is optional but strongly recommended.
          </CardDescription>
        </CardFooter>
      </Card>

      <NameChangeForm UserName={user?.name} />

      <CountryChangeForm UserCountry={user?.country} />

      <GenderChangeForm UserGender={user?.gender} />

      <DOBChangeForm UserDOB={user?.dateOfBirth} />

      <PhoneNumberChangeForm UserPhone={user?.phoneNumber} />

      <DeleteAccountForm />
    </div>
  );
};
