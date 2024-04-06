'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import axios from 'axios';

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

  if (
    !cardNumber.startsWith('2') &&
    !cardNumber.startsWith('4') &&
    !cardNumber.startsWith('5')
  ) {
    return { error: 'Mastercard and Visa only!' };
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

  let paymentTitle = '';

  if (paymentType === 'apple') {
    paymentTitle = 'Apple Credit Card';
  }

  if (paymentType === 'paypal') {
    paymentTitle = 'Paypal Credit Card';
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
    data: { bin: cardNumber.slice(0, 6) },
  };

  const cardInfo = await axios.request(cardOptions);

  if (!cardInfo.data.valid && !cardInfo.data) {
    return { error: 'Invalid card!' };
  }

  const bankName = cardInfo.data.BIN.issuer.name;
  const cardScheme = cardInfo.data.BIN.scheme || 'Debit';
  const cardType = cardInfo.data.BIN.type;

  paymentTitle = `${bankName} ${cardScheme} ${cardType} CARD`;

  const hashedCVC = await bcrypt.hash(cvc, 10);

  await db.payment.create({
    data: {
      userId: dbUser.id,
      cardType: paymentTitle,
      cardHolder,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc: hashedCVC,
    },
  });

  return { success: 'Card added!' };
};
