'use client';

import { gabarito } from '../../utils/Fonts';

export const CartComponent = () => {
  return (
    <div>
      <h1
        className={`font-black text-inherit text-4xl ${gabarito.className} drop-shadow-lg`}
      >
        YOUR CART
      </h1>
    </div>
  );
};
