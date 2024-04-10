'use server';

import { getAddressById } from '../../data/get-address';
import { getUserById } from '@/data/user';
import { db } from '@/database/db';
import { currentUser } from '@/lib/server-auth';

export const RemoveAddress = async (addressdId: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    throw Error;
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    throw Error;
  }

  const address = await getAddressById(addressdId);

  if (!address) {
    throw Error;
  }

  await db.address.delete({
    where: { id: address.id },
  });

  return true;
};
