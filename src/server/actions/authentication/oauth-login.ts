'use server';

import { signIn } from '@/lib/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes/route';

export const SignIn = async (provider: 'facebook' | 'google') => {
  await signIn(provider, {
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
};
