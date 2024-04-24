'use server';

import * as z from 'zod';

import { db } from '@/server/database/db';
import { getUserById } from '@/server/data/user';

import { currentUser } from '@/lib/server-auth';
import { CardEditSchema } from '@/schemas';
import {
  getPaymentMethodById,
  getDefaultPaymentMethodByUserId,
} from '@/server/data/get-payment-method';

export const UpdatePaymentMethod = async (
  values: z.infer<typeof CardEditSchema>,
  cardID: string
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  if (!cardID) {
    return { error: 'Invalid Card!' };
  }

  const card = await getPaymentMethodById(cardID);

  if (!card) {
    return { error: 'Invalid Card!' };
  }

  const validatedFields = CardEditSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { cardHolder, expiryMonth, expiryYear, defaultCard } =
    validatedFields.data;

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const hasExpired =
    Number(expiryYear) <= currentYear && Number(expiryMonth) < currentMonth;

  if (hasExpired) {
    return { error: 'Card has expired!' };
  }

  if (defaultCard) {
    const previousDefaultCard = await getDefaultPaymentMethodByUserId(user.id);

    if (previousDefaultCard) {
      await db.payment.update({
        where: { id: previousDefaultCard.id },
        data: {
          default: false,
        },
      });
    }
  }

  await db.payment.update({
    where: { id: cardID },
    data: {
      cardHolder,
      expiryMonth,
      expiryYear,
      default: defaultCard,
    },
  });

  return { success: 'Card updated!' };
};
