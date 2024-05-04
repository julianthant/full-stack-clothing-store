'use server';

import * as z from 'zod';

import { db } from '@/server/database/db';
import { NameSchema } from '@/schemas';
import { getUserById } from '@/server/get-user-data/user';

import { currentUser } from '@/lib/server-auth';
import { unstable_update } from '@/lib/auth';

export const ChangeCountry = async (values: z.infer<typeof NameSchema>) => {
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
    return { error: 'Invalid country!' };
  }

  const response = await fetch('https://restcountries.com/v3.1/all');
  const countriesRaw = await response.json();

  const countryNames = countriesRaw.map(
    (country: { name: { common: string } }) => country.name.common
  );

  const { name } = validatedFields.data;

  if (!countryNames.includes(name)) {
    return { error: 'Invalid country!' };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      country: name,
    },
  });

  unstable_update({
    user: {
      country: name,
    },
  });

  return { success: 'Country Changed!' };
};
