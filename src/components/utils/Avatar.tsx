import React from 'react';
import { Avatar, AvatarIcon } from '@nextui-org/react';

export const AvatarFallback = () => {
  return (
    <div className="flex items-center">
      <Avatar
        icon={<AvatarIcon />}
        classNames={{
          icon: 'text-black/80',
        }}
        size="sm"
      />
    </div>
  );
};
