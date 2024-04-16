import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

export const integral_cf = localFont({
  src: [
    {
      path: '../../public/fonts/IntegralCF/IntegralCF-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IntegralCF/InegralCF-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IntegralCF/IntegralCF-semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IntegralCF/IntegralCF-bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IntegralCF/IntegralCF-extrabold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/fonts/IntegralCF/IntegralCF-heavybold.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-integral_cf'
});

export const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi/Satoshi-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi/Satoshi-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi'
});

export const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
