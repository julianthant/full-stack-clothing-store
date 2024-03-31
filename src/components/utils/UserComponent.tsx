import { User } from '@nextui-org/user';
import { AvatarFallback } from './Avatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const UserComponent = () => {
  const user = useCurrentUser();

  return (
    <User
      name={user?.name}
      description={user?.email}
      classNames={{
        name: 'text-default-600',
        description: 'text-default-500',
      }}
      avatarProps={{
        size: 'sm',
        src: user?.image as string,
        fallback: <AvatarFallback />,
      }}
    />
  );
};
