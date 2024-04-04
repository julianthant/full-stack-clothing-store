'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/database/db';
import { getUserById } from '@/data/user';

import { cardAddSchema } from '@/schemas';
import { getPaymentMethodByCardNumber } from '@/data/payment-methods';
import { currentUser } from '@/lib/server-auth';

export const AddPaymentMethod = async (
  values: z.infer<typeof cardAddSchema>
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  const validatedFields = cardAddSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { paymentType, cardHolder, cardNumber, expiryMonth, expiryYear, cvc } =
    validatedFields.data;

  if (
    paymentType !== 'card' &&
    paymentType !== 'paypal' &&
    paymentType !== 'apple'
  ) {
    return { error: 'Invalid payment type!' };
  }

  const existingCard = await getPaymentMethodByCardNumber(cardNumber);

  if (existingCard) {
    return { error: 'Card already in use!' };
  }

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const hasExpired =
    Number(expiryYear) <= currentYear && Number(expiryMonth) < currentMonth;

  if (hasExpired) {
    return { error: 'Card has expired!' };
  }

  const hashedCVC = await bcrypt.hash(cvc, 10);

  await db.payment.create({
    data: {
      userId: dbUser.id,
      cardType: paymentType,
      cardHolder,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc: hashedCVC,
    },
  });

  return { success: 'Card added!' };
};
