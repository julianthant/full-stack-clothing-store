import localFont from 'next/font/local';

export const IntegralCF = localFont({
  src: [
    {
      path: './IntegralCF/IntegralCF-bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './IntegralCF/IntegralCF-heavybold.otf',
      weight: '900',
      style: 'normal',
    },
  ],
});

export const Satoshi = localFont({
  src: [
    {
      path: './Satoshi/Satoshi-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './Satoshi/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Satoshi/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Satoshi/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});
