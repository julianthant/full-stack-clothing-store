import NextAuth from 'next-auth';
import authConfig from './auth.config';

import { db } from '@/server/database/db';
import { UserRole } from '@prisma/client';
import { getUserById } from '@/server/get-user-data/user';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getAccountByUserId } from '@/server/get-user-data/account';
import { getTwoFactorConfirmationByUserId } from '@/server/get-user-data/two-factor-confirmation';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) return false;

      if (existingUser.is2FAEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFAConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;

        session.user.country = token.country as string;
        session.user.gender = token.gender as string;
        session.user.phoneNumber = token.phoneNumber as string;
        session.user.dateOfBirth = token.dateOfBirth as Date;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.is2FAEnabled = token.is2FAEnabled as boolean;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.country = existingUser.country ?? '';
      token.phoneNumber = existingUser.phoneNumber ?? '';

      token.dateOfBirth = existingUser.dateOfBirth ?? '';
      token.role = existingUser.role;
      token.gender = existingUser.gender ?? '';

      token.isOAuth = !!existingAccount;
      token.is2FAEnabled = existingUser.is2FAEnabled;

      return token;
    },
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  ...authConfig,
});
