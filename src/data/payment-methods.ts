import { db } from '@/database/db';

export const getPaymentMethodsByUserId = async (userId: string) => {
  try {
    const paymentMethods = await db.payment.findMany({
      where: { userId },
    });

    return paymentMethods;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPaymentMethodById = async (id: string) => {
  try {
    const paymentMethod = await db.payment.findUnique({
      where: { id },
    });

    return paymentMethod;
  } catch {
    return null;
  }
};

export const getPaymentMethodByCardNumber = async (cardNumber: string) => {
  try {
    const paymentMethod = await db.payment.findFirst({
      where: { cardNumber },
    });

    return paymentMethod;
  } catch {
    return null;
  }
};
