import { UserRole } from '@prisma/client';
import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  country: string | undefined;
  phoneNumber: string | undefined;

  dateOfBirth: Date | undefined;
  role: UserRole;
  gender: string | undefined;

  isOAuth: boolean;
  is2FAEnabled: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
