'use server';

import * as z from 'zod';

import { db } from '@/server/database/db';
import { dateSchema } from '@/schemas';
import { getUserById } from '@/server/get-user-data/user';

import { currentUser } from '@/lib/server-auth';
import { unstable_update } from '@/lib/auth';

export const ChangeDOB = async (values: z.infer<typeof dateSchema>) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  const validatedFields = dateSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid name!' };
  }
  const { date } = validatedFields.data;

  if (date > new Date()) {
    return { error: 'Invalid date!' };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      dateOfBirth: date,
    },
  });

  unstable_update({
    user: {
      dateOfBirth: date,
    },
  });

  return { success: 'Date of Birth changed!' };
};
