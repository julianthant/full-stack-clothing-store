'use server';

import { getPaymentMethodById } from '../../get-user-data/get-payment-method';
import { getUserById } from '@/server/get-user-data/user';
import { db } from '@/server/database/db';
import { currentUser } from '@/lib/server-auth';

export const RemovePaymentMethod = async (paymentMethodId: string) => {
  console.log(paymentMethodId);

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

  if (paymentMethod.userId !== dbUser.id) {
    throw Error;
  }

  await db.payment.delete({
    where: { id: paymentMethod.id },
  });
};
