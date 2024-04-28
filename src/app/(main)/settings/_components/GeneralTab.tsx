'use client';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
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

      <Card>
        <CardHeader>
          <CardTitle>Primary Mobile Number</CardTitle>
          <CardDescription>
            Please enter your current mobile number.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="(+1) 000-000-0000" />
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-3">
          <CardDescription>
            This will help us provide you with the best experience.
          </CardDescription>
          <Button>Save</Button>
        </CardFooter>
      </Card>

      <Card className="border-red-400 ">
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
          <CardDescription>
            Permanently remove your Personal Account and all of its contents
            from the StyleZ platform. This action is not reversible, so please
            continue with caution.
          </CardDescription>
        </CardHeader>
        <CardFooter
          className={cn(
            'border-t border-red-400 px-6 py-3 bg-red-100 rounded-b-xl'
          )}
        >
          <Button className="ml-auto" variant={'destructive'}>
            Delete Personal Account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
