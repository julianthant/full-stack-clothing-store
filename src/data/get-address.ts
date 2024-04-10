import { db } from '@/database/db';

export const getAddressById = async (id: string) => {
  try {
    const address = await db.address.findUnique({
      where: { id },
    });

    return address;
  } catch {
    return null;
  }
};

export const getAddresssByUserId = async (userId: string) => {
  try {
    const addresses = await db.address.findMany({
      where: { userId },
    });

    return addresses;
  } catch (error) {
    return null;
  }
};
