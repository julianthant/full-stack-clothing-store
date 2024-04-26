import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarIcon } from '@nextui-org/shared-icons';
import { cn } from '@/lib/utils';

type UserComponentProps = {
  page: 'Navbar' | 'Profile';
  user: any;
};

export const UserComponent = ({ page, user }: UserComponentProps) => {
  return (
    <div
      className={cn(
        'py-2 flex items-center space-x-2',
        page === 'Navbar' && 'w-[200px]'
      )}
    >
      <Avatar className="w-9 h-9">
        <AvatarImage src={user?.image as string} />
        <AvatarFallback>
          <AvatarIcon className="w-6 h-6" />
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          'flex flex-col lg:w-[190px] w-[150px]',
          page === 'Navbar' && 'lg:w-full w-[160]'
        )}
      >
        <div className="truncate text-default-600 text-sm tracking-wide">
          {user?.name}
        </div>
        <div className="truncate text-default-500 text-xs tracking-wider">
          {user.email}
        </div>
      </div>
    </div>
  );
};
