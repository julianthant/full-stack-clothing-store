'use server';

import { signOut } from '@/lib/auth';

export const SignOut = async () => {
  await signOut();
};
