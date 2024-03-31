import { Gabarito, Roboto } from 'next/font/google';

export const gabarito = Gabarito({
  subsets: ['latin'],
  weight: '900',
  style: ['normal'],
  display: 'swap',
  adjustFontFallback: false,
});

export const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });
