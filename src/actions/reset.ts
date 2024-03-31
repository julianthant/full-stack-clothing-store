'use server';

import * as z from 'zod';

import { auth } from '@/lib/auth';
import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { sendLoggedInPasswordEmail, sendPasswordEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/token';

export const Reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid email!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  const session = auth();

  if (!!session) {
    await sendLoggedInPasswordEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );
  } else {
    await sendPasswordEmail(passwordResetToken.email, passwordResetToken.token);
  }

  return { success: 'Email sent!' };
};
