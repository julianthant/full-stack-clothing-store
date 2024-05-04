'use server';

import * as z from 'zod';

import { db } from '@/server/database/db';
import { PhoneNumberSchema } from '@/schemas';
import { getUserById } from '@/server/get-user-data/user';

import { currentUser } from '@/lib/server-auth';
import { unstable_update } from '@/lib/auth';

export const ChangePhoneNumber = async (
  values: z.infer<typeof PhoneNumberSchema>
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  const validatedFields = PhoneNumberSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid number!' };
  }

  const { number } = validatedFields.data;

  if (/[a-zA-Z]/.test(number)) {
    return { error: 'Invalid number!' };
  }

  if ('+' !== number[0]) {
    return { error: 'Number must include country code!' };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      phoneNumber: number,
    },
  });

  unstable_update({
    user: {
      phoneNumber: number,
    },
  });

  return { success: 'Phone Number Changed!' };
};
