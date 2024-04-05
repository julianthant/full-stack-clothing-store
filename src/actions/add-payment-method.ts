'use server';

import * as z from 'zod';
import bcrypt from 'bcryptjs';
import axios from 'axios';

import { db } from '@/database/db';
import { getUserById } from '@/data/user';

import { cardAddSchema } from '@/schemas';
import { getPaymentMethodByCardNumber } from '@/data/payment-methods';
import { currentUser } from '@/lib/server-auth';

import { createCanvas, loadImage } from 'canvas';
import path from 'path';

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

  const template = await loadImage(
    path.resolve('./src/components/images/credit-card-plain.png')
  );

  const canvas = createCanvas(template.width, template.height);
  const ctx = canvas.getContext('2d');

  ctx.drawImage(template, 0, 0, template.width, template.height);

  ctx.font = 'bold 76px Courier';
  ctx.fillStyle = 'black';

  ctx.fillText(expiryMonth.padStart(2, '0'), 170, 600);
  ctx.fillText('/', 260, 600);
  ctx.fillText(expiryYear, 300, 600);
  ctx.fillText(cardHolder, 170, 700);

  const buffer = canvas.toBuffer();
  const base64Image = buffer.toString('base64');
  const imageUrl = `data:image/png;base64,${base64Image}`;

  paymentTitle = `${bankName} ${cardScheme} ${cardType} CARD`;

  const hashedCVC = await bcrypt.hash(cvc, 10);

  await db.payment.create({
    data: {
      userId: dbUser.id,
      cardType: paymentTitle,
      cardHolder,
      cardImage: imageUrl,
      cardNumber,
      expiryMonth,
      expiryYear,
      cvc: hashedCVC,
    },
  });

  return { success: 'Card added!' };
};
