'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import axios from 'axios';

import { db } from '@/database/db';
import { getUserById } from '@/data/user';

import { cardAddSchema } from '@/schemas';
import { getPaymentMethodsByUserId } from '@/data/payment-methods';
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

  if (!cardNumber.startsWith('4') && !cardNumber.startsWith('5')) {
    return { error: 'Mastercard and Visa only!' };
  }

  const existingCards = await getPaymentMethodsByUserId(dbUser.id);

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

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const hasExpired =
    Number(expiryYear) <= currentYear && Number(expiryMonth) < currentMonth;

  if (hasExpired) {
    return { error: 'Card has expired!' };
  }

  let paymentTitle = '';

  if (paymentType === 'apple') {
    paymentTitle = 'Apple';
  }

  if (paymentType === 'paypal') {
    paymentTitle = 'Paypal';
  }

  const cardOptions = {
    method: 'POST',
    url: 'https://bin-ip-checker.p.rapidapi.com/',
    params: { bin: cardNumber.slice(0, 6) },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.CARD_API_KEY,
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

  if (paymentType === 'card') {
    paymentTitle = cardScheme;
  }

  const hashedCard = await bcrypt.hash(cardNumber, 10);
  const hashedCVC = await bcrypt.hash(cvc, 10);

  await db.payment.create({
    data: {
      userId: dbUser.id,
      bankName,
      cardType,
      cardScheme: paymentTitle,
      cardHolder,
      cardNumber: hashedCard,
      lastFourNumbers: cardNumber.slice(-4),
      expiryMonth,
      expiryYear,
      cvc: hashedCVC,
    },
  });

  return { success: 'Card added!' };
};
