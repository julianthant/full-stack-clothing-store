'use server';

import * as z from 'zod';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import { db } from '@/server/database/db';
import { getUserById } from '@/server/data/user';
import { getPaymentMethodsByUserId } from '../../data/get-payment-method';

import { currentUser } from '@/lib/server-auth';
import { cardAddSchema } from '@/schemas';

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

  if (existingCards) {
    let cardMatch = false;
    for (const card of existingCards) {
      cardMatch = await bcrypt.compare(cardNumber, card.cardNumber);
      if (cardMatch) {
        break;
      }
    }

    if (cardMatch) {
      return { error: 'Card already exists!' };
    }
  }

  const [expiryMonth, expiryYear] = expiryDate.split('/');

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const hasExpired =
    Number(expiryYear) <= Number(currentYear.toString().slice(2, 4)) &&
    Number(expiryMonth) < currentMonth;

  if (hasExpired) {
    return { error: 'Card has expired!' };
  }

  const cardOptions = {
    method: 'POST',
    url: 'https://bin-ip-checker.p.rapidapi.com/',
    params: { bin: cardNumber.slice(0, 6) },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'bin-ip-checker.p.rapidapi.com',
    },
    data: { bin: cardNumber },
  };

  const cardInfo = await axios.request(cardOptions);

  if (!cardInfo.data && !cardInfo.data.valid) {
    return { error: 'Invalid card!' };
  }

  const bankName = cardInfo.data.BIN.issuer.name;
  const cardScheme = cardInfo.data.BIN.scheme;
  const cardType = cardInfo.data.BIN.type || 'Debit';

  const hashedCard = await bcrypt.hash(cardNumber, 10);
  const hashedCVC = await bcrypt.hash(cvc, 10);

  await db.payment.create({
    data: {
      userId: dbUser.id,
      bankName,
      cardType,
      cardScheme,
      cardHolder,
      cardNumber: hashedCard,
      lastFourNumbers: cardNumber.slice(-4),
      expiryMonth,
      expiryYear,
      default: firstCard,
      cvc: hashedCVC,
    },
  });

  return { success: 'Card added!' };
};
