import * as z from 'zod';

export const EmailSchema = z.object({
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
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export const NameSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
});

export const PhoneNumberSchema = z.object({
  number: z.string().min(1, { message: 'Phone number is required' }),
});

export const TwoFASchema = z.object({
  code: z.string().length(6),
});

export const CardEditSchema = z.object({
  cardHolder: z.string().min(1, { message: 'Name is required' }).optional(),
  expiryMonth: z
    .string()
    .min(1, { message: 'Expiry month is required' })
    .max(2, { message: 'Invalid month' })
    .optional(),
  expiryYear: z.string().length(4, { message: 'Invalid year' }).optional(),
  defaultCard: z.boolean().default(false).optional(),
});

export const cardAddSchema = z.object({
  cardHolder: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(32, { message: 'Name is too long' }),
  cardNumber: z
    .string()
    .min(18, { message: 'Card must be at least 15 numbers' })
    .max(19, { message: 'Card cannot exceed 16 numbers' })
    .trim(),
  expiryDate: z.string().length(7, { message: 'Invalid expiry date' }),
  cvc: z
    .string()
    .min(3, { message: 'Invalid CVC' })
    .max(4, { message: 'Invalid CVC' }),
});

export const addressSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(32, { message: 'Name is too long' }),
  streetAddress: z.string().min(1, { message: 'Address is required' }),
  streetOptional: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  states: z.string().optional(),
  zipCode: z.string().min(1, { message: 'Zip is required' }).trim(),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  deliveryInstructions: z.string().optional(),
  defaultAddress: z.boolean().default(false).optional(),
});

export const genderSchema = z.object({
  gender: z.string(),
});

export const dateSchema = z.object({
  date: z.date(),
});
