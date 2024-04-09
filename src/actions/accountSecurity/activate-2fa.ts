'use server';

import * as z from 'zod';

import { db } from '@/database/db';
import { TwoFASchema } from '@/schemas';
import { getUserById } from '@/data/user';

import { currentUser } from '@/lib/server-auth';
import { unstable_update } from '@/lib/auth';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const Validate2FACode = async (
  values: z.infer<typeof TwoFASchema>,
  formType: string
) => {
  if (formType !== 'activate' && formType !== 'deactivate') {
    return { error: 'Invalid form type!' };
  }

  const user = await currentUser();

  if (!user || !user.id || !user.email) {
    return { error: 'Unauthorized!' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized!' };
  }

  const validatedFields = TwoFASchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid code!' };
  }

  const { code } = validatedFields.data;

  if (code) {
    const twoFactorToken = await getTwoFactorTokenByEmail(user.email);

    if (!twoFactorToken) {
      return { error: 'Invalid code!' };
    }

    if (twoFactorToken.token !== code) {
      return { error: 'Invalid code!' };
    }

    const hasExpired = new Date(twoFactorToken.expires) < new Date();

    if (hasExpired) {
      return { error: 'Code has expired!' };
    }

    await db.twoFAToken.delete({
      where: { id: twoFactorToken.id },
    });

    const existingConfirmation = await getTwoFactorConfirmationByUserId(
      user.id
    );

    if (existingConfirmation) {
      await db.twoFAConfirmation.delete({
        where: { id: existingConfirmation.id },
      });
    }

    await db.twoFAConfirmation.create({
      data: {
        userId: user.id,
      },
    });
  }

  if (formType === 'activate') {
    await db.user.update({
      where: { id: dbUser.id },
      data: {
        is2FAEnabled: true,
      },
    });

    unstable_update({
      user: {
        is2FAEnabled: true,
      },
    });

    return { success: '2FA Activated!' };
  }

  if (formType === 'deactivate') {
    await db.user.update({
      where: { id: dbUser.id },
      data: {
        is2FAEnabled: false,
      },
    });

    unstable_update({
      user: {
        is2FAEnabled: false,
      },
    });

    return { success: '2FA Deactivated!' };
  }
};
