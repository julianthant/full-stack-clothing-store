'use server';

import * as z from 'zod';

import { db } from '@/server/database/db';
import { getUserById } from '@/server/get-user-data/user';

import { currentUser } from '@/lib/server-auth';
import { signOut } from '@/lib/auth';

export const DeleteAccount = async () => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  await db.user.delete({
    where: { id: dbUser.id },
  });

  await signOut();

  return { success: 'Account Deleted!' };
};
