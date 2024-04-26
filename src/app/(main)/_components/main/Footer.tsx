import Link from 'next/link';

import { Icons } from '../../../../components/utils/Icons';
import { Divider } from '@nextui-org/react';
import { IntegralCF } from '@/app/fonts/fonts';
import { NewsletterComponent } from './NewsletterComponent';

export const Footer = () => {
  const FooterNavs = [
    {
      title: 'COMPANY',
      pages: [
        {
          title: 'About',
          link: '/about-us',
        },
        {
          title: 'Features',
          link: '/contact-us',
        },
        {
          title: 'Words',
          link: '/careers',
        },
        {
          title: 'Careers',
          link: '/press',
        },
      ],
    },
    {
      title: 'HELP',
      pages: [
        {
          title: 'Customer Support',
          link: '/about-us',
        },
        {
          title: 'Delivery Details',
          link: '/contact-us',
        },
        {
          title: 'Terms & Conditions',
          link: '/careers',
        },
        {
          title: 'Privacy Policy',
          link: '/press',
        },
      ],
    },
    {
      title: 'FAQ',
      pages: [
        {
          title: 'Account',
          link: '/about-us',
        },
        {
          title: 'Manage Deliveries',
          link: '/contact-us',
        },
        {
          title: 'Orders & Returns',
          link: '/careers',
        },
        {
          title: 'Payments',
          link: '/press',
        },
      ],
    },
    {
      title: 'RESOURCES',
      pages: [
        {
          title: 'Free eBooks',
          link: '/about-us',
        },
        {
          title: 'Development Tutorial',
          link: '/contact-us',
        },
        {
          title: 'How to - Blog',
          link: '/careers',
        },
        {
          title: 'Youtube Playlist',
          link: '/press',
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col pt-16">
      <div className="relative">
        <NewsletterComponent />
        <div className="bg-foreground-100 w-full absolute top-1/2 h-1/2" />
      </div>

      <div className="bg-foreground-100 pb-14 pt-12">
        <div className="container space-y-12 relative">
          <nav className="lg:flex items-center justify-between grid w-full sm:grid-rows-[8rem]  grid-cols-2 gap-y-6">
            <div className="lg:w-[261px] lg:space-y-5 space-y-3 font-light place-self-stretch col-span-2 h-min">
              <Link
                href="/"
                className={`font-bold ${IntegralCF.className} text-inherit text-4xl drop-shadow-lg max-sm:text-3xl`}
              >
                <Icons.logo />
              </Link>
              <p className="text-sm text-foreground-500 leading-7 font-light">
                We have clothes that suits your style and which you&apos;re
                proud to wear. From women to men.
              </p>
              <div className="flex items-center gap-x-5 pt-1">
                <Icons.facebook className="w-6 h-6" />
                <Icons.gitHub className="w-6 h-6" />
                <Icons.twitter className="w-6 h-6" />
                <Icons.google className="w-6 h-6" />
              </div>
            </div>

            {FooterNavs.map((nav, index) => (
              <div key={index} className="lg:space-y-5 space-y-4">
                <h3 className="font-medium text-base tracking-[0.15em]">
                  {nav.title}
                </h3>
                <div className="lg:space-y-5 space-y-4 text-foreground-500">
                  {nav.pages.map((page, index) => (
                    <div key={index}>
                      <Link
                        href={page.link}
                        className="text-base font-light hover:text-blue-600"
                      >
                        {page.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <Divider />

          <div className="flex items-center sm:justify-between justify-center">
            <p className="text-sm text-foreground-500 leading-7 font-light ">
              StyleZ &copy; 2000-2024. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
