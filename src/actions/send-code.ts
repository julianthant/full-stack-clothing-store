'use server';

import { getUserByEmail } from '@/data/user';
import { sendTwoFAEmail } from '@/lib/mail';

import { generateTwoFAToken } from '@/lib/token';

export const sendTwoFactorActivationCode = async (email: string) => {
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.emailVerified) {
    throw Error;
  }

  const twoFAToken = await generateTwoFAToken(existingUser.email);

  await sendTwoFAEmail(twoFAToken.email, twoFAToken.token);

  return;
};
