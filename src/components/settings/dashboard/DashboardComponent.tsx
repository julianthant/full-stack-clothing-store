'use client';

import { gabarito } from '../../utils/Fonts';

export const DashboardComponent = () => {
  return (
    <div>
      <h1
        className={`font-black text-inherit text-4xl ${gabarito.className} drop-shadow-lg`}
      >
        YOUR DASHBOARD
      </h1>
    </div>
  );
};
