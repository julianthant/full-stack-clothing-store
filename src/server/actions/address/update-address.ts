'use server';

import * as z from 'zod';

import { db } from '@/server/database/db';
import { getUserById } from '@/server/get-user-data/user';

import { currentUser } from '@/lib/server-auth';
import { addressSchema } from '@/schemas';
import { getAddressById } from '@/server/get-user-data/get-address';

export const UpdateAddress = async (
  values: z.infer<typeof addressSchema>,
  id: string
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  if (!id) {
    return { error: 'Invalid Address ID!' };
  }

  const address = await getAddressById(id);

  if (!address) {
    return { error: 'Invalid Address ID!' };
  }

  const validatedFields = addressSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const {
    fullName,
    streetAddress,
    streetOptional,
    city,
    country,
    states,
    zipCode,
    phoneNumber,
    deliveryInstructions,
    defaultAddress,
  } = validatedFields.data;

  const response = await fetch('https://restcountries.com/v3.1/all');
  const countriesRaw = await response.json();

  const countryNames = countriesRaw.map(
    (country: { name: { common: string } }) => country.name.common
  );

  if (!countryNames.includes(country)) {
    return { error: 'Invalid country!' };
  }

  if (country === 'United States' && !states) {
    return { error: 'State is required!' };
  }

  if (
    country !== 'United States' &&
    address.country !== 'United States' &&
    states
  ) {
    return { error: 'State is not required!' };
  }

  let stateCheck = states;

  if (address.country === 'United States' && country !== 'United States') {
    stateCheck = '';
  }

  if (states) {
    const response = await fetch(
      'https://api.census.gov/data/2010/dec/sf1?get=NAME&for=state:*'
    );
    const statesRaw = await response.json();

    statesRaw.shift();
    const statesList = statesRaw.map((stateData: String) => stateData[0]);

    if (!statesList.includes(states)) {
      return { error: 'Invalid state!' };
    }
  }

  if (!zipCode.match(/^\d{5}(?:[-\s]\d{4})?$/)) {
    return { error: 'Invalid zip code!' };
  }

  if (/[a-zA-Z]/.test(phoneNumber)) {
    return { error: 'Invalid phone number!' };
  }

  if (defaultAddress) {
    await db.address.updateMany({
      where: {
        userId: dbUser.id,
        defaultAddress: true,
      },
      data: {
        defaultAddress: false,
      },
    });
  }

  await db.address.update({
    where: { id: id, userId: dbUser.id },
    data: {
      userId: dbUser.id,
      fullName,
      streetAddress,
      streetOptional,
      city,
      country,
      states: stateCheck,
      zipCode,
      phoneNumber,
      deliveryInstructions,
      defaultAddress,
    },
  });

  return { success: 'Address updated!' };
};
