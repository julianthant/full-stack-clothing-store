'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/server/database/db';
import { getUserById } from '@/server/get-user-data/user';
import { getPaymentMethodsByUserId } from '../../get-user-data/get-payment-method';

import { currentUser } from '@/lib/server-auth';
import { cardAddSchema } from '@/schemas';
import { GetCardBin } from './get-card-bin';

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

  const { cardHolder, cardNumber, expiryDate, cvc } = validatedFields.data;

  if (!cardNumber.startsWith('4') && !cardNumber.startsWith('5')) {
    return { error: 'Mastercard and Visa only!' };
  }

  const existingCards = await getPaymentMethodsByUserId(dbUser.id);

  const firstCard = existingCards?.length === 0;

  const formattedCardNumber = cardNumber.replace(/\s/g, '');

  if (existingCards) {
    let cardMatch = false;
    for (const card of existingCards) {
      cardMatch = await bcrypt.compare(formattedCardNumber, card.cardNumber);
      if (cardMatch) {
        break;
      }
    }

    if (cardMatch) {
      return { error: 'Card already exists!' };
    }
  }

  const [expiryMonth, expiryYear] = expiryDate.replace(/\s/g, '').split('/');

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const hasExpired =
    Number(expiryYear) <= Number(currentYear.toString().slice(2, 4)) &&
    Number(expiryMonth) < currentMonth;

  if (hasExpired) {
    return { error: 'Card has expired!' };
  }

  if (cvc.length < 3 || cvc.length > 4) {
    return { error: 'Invalid CVC!' };
  }

  const cardInfo = await GetCardBin(formattedCardNumber.slice(0, 6));

  if (!cardInfo) {
    return { error: 'Invalid card number!' };
  }

  const bankName = cardInfo.data.BIN.issuer.name ?? 'Unknown';
  const cardScheme = cardInfo.data.BIN.scheme ?? 'Unknown';
  const cardType = cardInfo.data.BIN.type ?? 'Debit';

  const hashedCard = await bcrypt.hash(formattedCardNumber, 10);
  const hashedCVC = await bcrypt.hash(cvc, 10);

  await db.payment.create({
    data: {
      userId: dbUser.id,
      bankName,
      cardType,
      cardScheme,
      cardHolder,
      cardNumber: hashedCard,
      lastFourNumbers: formattedCardNumber.slice(-4),
      expiryMonth,
      expiryYear,
      default: firstCard,
      cvc: hashedCVC,
    },
  });

  return { success: 'Card added!' };
};
