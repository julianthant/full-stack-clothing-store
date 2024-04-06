import { db } from '@/database/db';

export const getDefaultPaymentMethodByUserId = async (userId: string) => {
  try {
    const paymentMethod = await db.payment.findFirst({
      where: { userId, default: true },
    });

    return paymentMethod;
  } catch (error) {
    return null;
  }
};
