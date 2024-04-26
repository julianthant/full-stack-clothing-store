'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarIcon } from '@nextui-org/shared-icons';
import { cn } from '@/lib/utils';
import { use } from 'react';
import { User } from '@prisma/client';

type UserComponentProps = {
  page: 'Navbar' | 'Profile';
  user: any;
};

export const UserComponent = ({ page, user }: UserComponentProps) => {
  const currentUser: User = use(user);
  return (
    <div>
      <div
        className={cn(
          'py-2 flex items-center space-x-2',
          page === 'Navbar' && 'w-[200px]'
        )}
      >
        <Avatar className="w-9 h-9">
          <AvatarImage src={user?.image as string} />
          <AvatarFallback>
            <AvatarIcon />
          </AvatarFallback>
        </Avatar>
        <div
          className={cn(
            'flex flex-col lg:w-[190px] w-[150px]',
            page === 'Navbar' && 'lg:w-full w-[160]'
          )}
        >
          <div className="truncate text-default-600 text-sm tracking-wide">
            {currentUser.name}
          </div>
          <div className="truncate text-default-500 text-xs tracking-wider">
            {currentUser.email}
          </div>
        </div>
      </div>
    </div>
  );
};
