'use server';

import * as z from 'zod';

import { db } from '@/database/db';
import { ResetSchema } from '@/schemas';
import { getUserByEmail, getUserById } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';

import { currentUser } from '@/lib/server-auth';
import { generateVerificationToken } from '@/lib/token';
import { sendLoggedInVerficationEmail } from '@/lib/mail';

export const newEmailToken = async (values: z.infer<typeof ResetSchema>) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid number!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already in use!' };
  }

  const verificationToken = await generateVerificationToken(email);

  await sendLoggedInVerficationEmail(
    verificationToken.email,
    verificationToken.token
  );

  return { success: 'Confirmation email sent!' };
};

export const newEmailVerification = async (token: string) => {
  if (!token) {
    return { error: 'Missing token!' };
  }

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: 'Token does not exist!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exist!' };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Email verified!' };
};
