'use server';

import * as z from 'zod';

import { auth } from '@/lib/auth';
import { EmailSchema } from '@/schemas';
import { getUserByEmail } from '@/server/data/user';
import { sendLoggedInPasswordEmail, sendPasswordEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/token';

export const Reset = async (values: z.infer<typeof EmailSchema>) => {
  const validatedFields = EmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid email!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  const session = await auth();

  if (session) {
    await sendLoggedInPasswordEmail(
      passwordResetToken.email,
      passwordResetToken.token
    );
  } else {
    await sendPasswordEmail(passwordResetToken.email, passwordResetToken.token);
  }

  return { success: 'Email sent!' };
};
