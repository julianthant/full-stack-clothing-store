import React from 'react';
import { Avatar, AvatarIcon } from '@nextui-org/react';

interface AvatarFallbackProps {
  userImage: string | null | undefined;
}

export const AvatarFallback = ({ userImage }: AvatarFallbackProps) => {
  return (
    <div className="flex items-center">
      {!!userImage ? (
        <Avatar src={userImage} size="sm" />
      ) : (
        <Avatar
          icon={<AvatarIcon />}
          classNames={{
            icon: 'text-black/80',
          }}
          size="sm"
        />
      )}
    </div>
  );
};
