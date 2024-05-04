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

export const AvatarChangeForm = ({ UserAvatar }: any) => {
  return (
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
            <AvatarImage src={UserAvatar as string} />
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
  );
};
