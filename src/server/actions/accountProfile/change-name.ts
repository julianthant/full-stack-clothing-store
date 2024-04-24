'use server';

import * as z from 'zod';

import { db } from '@/server/database/db';
import { NameSchema } from '@/schemas';
import { getUserById } from '@/server/data/user';

import { currentUser } from '@/lib/server-auth';
import { unstable_update } from '@/lib/auth';

export const ChangeName = async (values: z.infer<typeof NameSchema>) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  const validatedFields = NameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid name!' };
  }
  const { name } = validatedFields.data;

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      name: name,
    },
  });

  unstable_update({
    user: {
      name: name,
    },
  });

  return { success: 'Name Changed!' };
};
