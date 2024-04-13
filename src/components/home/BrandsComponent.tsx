import { Icons } from '../utils/Icons';

export const BrandsComponent = ({}) => {
  return (
    <div className="bg-black h-24 flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          <Icons.versaceLogo />
          <Icons.zaraLogo />
          <Icons.gucciLogo />
          <Icons.pradaLogo />
          <Icons.CKLogo />
        </div>
      </div>
    </div>
  );
};
