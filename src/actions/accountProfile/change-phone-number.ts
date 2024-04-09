'use server';

import * as z from 'zod';

import { db } from '@/database/db';
import { PhoneNumberSchema } from '@/schemas';
import { getUserById } from '@/data/user';

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

  const { code, number } = validatedFields.data;

  if (/[a-zA-Z]/.test(number)) {
    return { error: 'Invalid number!' };
  }

  let countryCode = code.replace(/[^0-9]/g, '');

  if (countryCode.length === 4) {
    countryCode = countryCode.slice(0, 1) + ' ' + countryCode.slice(1, 4);
  }

  const phoneNumber = '+' + countryCode + ' ' + number;

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      phoneNumber: phoneNumber,
    },
  });

  unstable_update({
    user: {
      phoneNumber: phoneNumber,
    },
  });

  return { success: 'Phone Number Changed!' };
};
