import { ClothesGalleryComponent } from '@/components/shop/ClothesGalleryComponent';
import { FilterClothes } from '@/components/shop/FilterClothes';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="flex gap-6">
      <FilterClothes />
      <ClothesGalleryComponent />
    </div>
  );
};

export default page;
