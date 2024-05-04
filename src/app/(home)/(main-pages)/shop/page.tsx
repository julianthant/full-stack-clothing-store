import { ClothesGalleryComponent } from '@/components/shop/ClothesGalleryComponent';
import { FilterClothes } from '@/components/shop/FilterClothes';
import { FC } from 'react';

const page: FC = () => {
  return (
    <div className="flex gap-6">
      <div className="max-lg:hidden">
        <FilterClothes />
      </div>
      <ClothesGalleryComponent />
    </div>
  );
};

export default page;
