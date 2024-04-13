import Link from 'next/link';
import { FC } from 'react';
import { Divider } from '@nextui-org/react';
import { NewsletterComponent } from './NewsletterComponent';

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
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
    <div className="bg-foreground-100 pb-20 pt-28 mt-40">
      <div className="container space-y-12 relative">
        <NewsletterComponent />
        <nav className="flex items-center justify-between">
          <div className="w-[261px] space-y-8 font-light">
            <Link
              href="/"
              className={`font-black text-inherit text-4xl drop-shadow-lg max-sm:text-3xl`}
            >
              CLOTHES.CO
            </Link>
            <p className="text-sm text-foreground-500 leading-7 font-light">
              We have clothes that suits your style and which you&apos;re proud
              to wear. From <br /> women to men.
            </p>
          </div>
          {FooterNavs.map((nav, index) => (
            <div key={index} className="space-y-5">
              <h3 className="font-normal text-2xl">{nav.title}</h3>
              <ul className="space-y-5 font-light text-foreground-500">
                {nav.pages.map((page, index) => (
                  <li key={index}>
                    <Link href={page.link}>{page.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <Divider />

        <div className="flex items-center justify-betweewn">
          <p className="text-sm text-foreground-500 leading-7 font-light">
            Clothes.co &copy; 2000-2024. All Rights Reserved
          </p>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
