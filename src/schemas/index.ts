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
  cardHolder: z.string(),
  expiryMonth: z.string().min(1).max(2),
  expiryYear: z.string().length(4),
  defaultCard: z.boolean().default(false).optional(),
});

export const cardAddSchema = z.object({
  paymentType: z.string(),
  cardHolder: z.string(),
  cardNumber: z.string().min(15).max(16),
  expiryMonth: z.string().min(1).max(2),
  expiryYear: z.string().length(4),
  cvc: z.string().length(3),
});
