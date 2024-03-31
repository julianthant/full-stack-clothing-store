'use client';

import { gabarito } from '../../utils/Fonts';

export const OrderComponent = () => {
  return (
    <div>
      <h1
        className={`font-black text-inherit text-4xl ${gabarito.className} drop-shadow-lg`}
      >
        YOUR ORDERS
      </h1>
    </div>
  );
};
