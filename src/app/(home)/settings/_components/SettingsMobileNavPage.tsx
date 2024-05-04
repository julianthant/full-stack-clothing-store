import Link from 'next/link';

export const SettingsMobileNavPage = () => {
  const NavigationLinks = [
    'General',
    'Security',
    'Orders',
    'Billing',
    'Shipping',
    'Invoices',
  ];

  return (
    <div className="md:hidden grid">
      {NavigationLinks.map((title) => (
        <Link
          key={title}
          className="px-10 py-6 border-b"
          href={`/settings/${title.toLowerCase()}`}
        >
          {title}
        </Link>
      ))}
    </div>
  );
};
