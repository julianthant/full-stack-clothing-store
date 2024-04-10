'use server';

import { getPaymentMethodById } from '../../data/get-payment-method';
import { getUserById } from '@/data/user';
import { db } from '@/database/db';
import { currentUser } from '@/lib/server-auth';

export const RemovePaymentMethod = async (paymentMethodId: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    throw Error;
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    throw Error;
  }

  const paymentMethod = await getPaymentMethodById(paymentMethodId);

  if (!paymentMethod) {
    throw Error;
  }

  await db.payment.delete({
    where: { id: paymentMethod.id },
  });
};
