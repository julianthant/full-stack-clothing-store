import * as z from 'zod';

export const ResetSchema = z.object({
  email: z.string().email(),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: 'Password is required' }),
  code: z.optional(z.string().length(6)),
});

export const RegisterSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export const NameSchema = z.object({
  name: z.string(),
});

export const PhoneNumberSchema = z.object({
  code: z.string(),
  number: z.string(),
});

export const TwoFASchema = z.object({
  code: z.string().length(6),
});

export const CardEditSchema = z.object({
  name: z.string(),
  expiry_month: z.string().min(1).max(2),
  expiry_year: z.string().length(4),
});
