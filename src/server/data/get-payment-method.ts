import 'server-only'
import { db } from '@/server/database/db';

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

export const getPaymentMethodsByUserId = async (userId: string) => {
  try {
    const paymentMethods = await db.payment.findMany({
      where: { userId },
    });

    return paymentMethods;
  } catch (error) {
    return null;
  }
};

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
