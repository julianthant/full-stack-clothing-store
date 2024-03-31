'use client';

import { Listbox, ListboxItem } from '@nextui-org/listbox';

import { cn } from '@/lib/utils';
import { useState } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

import { UserComponent } from '@/components/utils/UserComponent';
import { AccountComponent } from './account/AccountComponent';
import { Divider } from '@nextui-org/react';

export const SettingsComponent = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const menuPage = searchParams.get('menu');

  const [selectedKey, setSelectedKey] = useState(menuPage || 'Account');

  const menuItems = ['Account', 'Orders', 'Dashboard'];

  return (
    <div className="space-y-5">
      <div className="border rounded-[20px] min-h-[650px] flex">
        <div className="w-[230px]">
          <div className="pb-2 p-3">
            <UserComponent />
          </div>

          <Divider />

          <h2 className="text-xs px-4 pt-6 pb-2">MENU</h2>

          <div className="w-full max-w-[260px] px-1 pb-2 rounded-small">
            <Listbox
              aria-label="Menu"
              variant="flat"
              classNames={{ list: ['gap-1'] }}
            >
              {menuItems.map((item) => (
                <ListboxItem
                  className={cn(selectedKey === item ? 'bg-gray-100' : '')}
                  onClick={() => {
                    setSelectedKey(item), menuPage && router.push('/settings');
                  }}
                  key={item}
                >
                  {item}
                </ListboxItem>
              ))}
            </Listbox>
          </div>
        </div>

        <div className="flex-1 border-l max-h-[650px] overflow-auto">
          {selectedKey === 'Account' && <AccountComponent />}
        </div>
      </div>
    </div>
  );
};
