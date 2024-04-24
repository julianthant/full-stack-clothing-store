import credentials from 'next-auth/providers/credentials';
import google from 'next-auth/providers/google';
import facebook from 'next-auth/providers/facebook';
import bcrypt from 'bcryptjs';

import type { NextAuthConfig } from 'next-auth';
import { LoginSchema } from '@/schemas';
import { getUserByEmail } from '@/server/data/user';

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
