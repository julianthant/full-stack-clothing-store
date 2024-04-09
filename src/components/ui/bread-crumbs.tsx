'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumbs, BreadcrumbItem } from '@nextui-org/react';

export const BreadCrumbs = () => {
  const pathname = usePathname();
  const linkTabs = pathname.split('/').filter((tab) => tab !== '');

  const getBreadCrumbs = () => {
    let path = '';

    return linkTabs.map((tab, i) => {
      const cleanedTab = tab.replace(/-/g, '');
      path += `/${cleanedTab}`;

      return (
        <BreadcrumbItem key={i + 1} href={path} className="capitalize">
          {tab}
        </BreadcrumbItem>
      );
    });
  };

  return (
    <Breadcrumbs>
      {linkTabs.length > 0 && (
        <BreadcrumbItem key={0} href="/">
          Home
        </BreadcrumbItem>
      )}

      {getBreadCrumbs()}
    </Breadcrumbs>
  );
};
