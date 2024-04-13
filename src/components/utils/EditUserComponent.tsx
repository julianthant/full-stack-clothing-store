import { FC, ReactNode } from 'react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Skeleton } from '@nextui-org/react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface EditUserComponentProps {
  Title: string;
  Name: string;
  FormLink: string;
  ShowEdit?: boolean;
  CustomEdit?: ReactNode;
}

const EditUserComponent: FC<EditUserComponentProps> = ({
  Title,
  Name,
  FormLink,
  ShowEdit = true,
  CustomEdit,
}) => {
  const user = useCurrentUser();

  return (
    <>
      {user ? (
        <div className="space-y-2 max-sm:space-y-1">
          {' '}
          <div className="flex items-center">
            <h3 className="font-semibold">{Title}</h3>

            {ShowEdit && (
              <Button
                asChild
                variant={'link'}
                className="text-green-600 font-semibold text-sm"
              >
                <Link href={FormLink} className="ml-auto">
                  Edit
                </Link>
              </Button>
            )}

            {CustomEdit}
          </div>
          <p>{Name}</p>{' '}
        </div>
      ) : (
        <div className="space-y-1">
          <div className="flex items-center">
            <Skeleton className="pr-4 rounded-lg h-4 w-1/6" />

            <Button
              variant={'link'}
              className="font-semibold ml-auto text-green-600"
            >
              Edit
            </Button>
          </div>

          <Skeleton className="rounded-lg h-4 w-1/3 max-sm:w-36" />
        </div>
      )}
    </>
  );
};

export default EditUserComponent;
