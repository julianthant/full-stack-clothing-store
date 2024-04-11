'use server';

import * as z from 'zod';

import { db } from '@/database/db';
import { genderSchema } from '@/schemas';
import { getUserById } from '@/data/user';

import { currentUser } from '@/lib/server-auth';
import { unstable_update } from '@/lib/auth';

export const ChangeGender = async (values: z.infer<typeof genderSchema>) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  const validatedFields = genderSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid gender!' };
  }

  const { gender } = validatedFields.data;

  if (gender !== 'male' && gender !== 'female') {
    return { error: 'Invalid gender!' };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      gender: gender,
    },
  });

  unstable_update({
    user: {
      gender: gender,
    },
  });

  return { success: 'Gender Changed!' };
};
