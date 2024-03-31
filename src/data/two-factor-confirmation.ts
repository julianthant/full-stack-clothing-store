import { db } from '@/database/db';

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFAConfirmation.findUnique({
      where: { userId },
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
