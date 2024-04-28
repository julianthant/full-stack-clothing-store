import { Icons } from '@/components/utils/Icons';

export const BrandsComponent = () => {
  return (
    <div className="bg-black lg:h-24 py-4 flex items-center">
      <div className="main-container w-full max-lg:px-0 max-sm:px-4 max-lg:max-w-[520px]">
        <div className="flex items-center lg:justify-between max-lg:flex-wrap justify-center max-lg:gap-x-10 max-lg:gap-y-6 max-sm:gap-x-5 gap-y-4 ">
          <Icons.versaceLogo className="max-sm:w-[126px]" />
          <Icons.zaraLogo className="max-md:w-20 max-sm:w-16" />
          <Icons.gucciLogo className="max-sm:w-28" />
          <Icons.pradaLogo className="max-sm:w-32 w-[185px]" />
          <Icons.CKLogo className="max-sm:w-32" />
        </div>
      </div>
    </div>
  );
};
