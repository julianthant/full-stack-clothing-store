import { FC, ReactNode } from 'react';
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
  return (
    <div className="space-y-2 max-sm:space-y-1">
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
      <p>{Name}</p>
    </div>
  );
};

export default EditUserComponent;
