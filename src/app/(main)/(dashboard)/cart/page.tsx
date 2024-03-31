import { CartComponent } from '@/components/settings/cart/CartComponent';
import { Metadata } from 'next';

interface cartProps {}

export const metadata: Metadata = {
  title: 'Cart | Clothes.co',
};

const cart = () => {
  return <CartComponent />;
};

export default cart;
