import * as z from 'zod';

// Common validations
const requiredString = z.string().min(1, { message: 'This field is required' });

const email = requiredString.email();

const password = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' });

const name = requiredString;

const phoneNumber = requiredString;

// Schemas
export const LoginSchema = z.object({
  email,
  password,
  code: z.string().length(6).optional(),
});

export const RegisterSchema = z.object({
  name,
  email,
  password,
});

export const NameSchema = z.object({
  name,
});

export const PhoneNumberSchema = z.object({
  number: phoneNumber,
});

export const TwoFASchema = z.object({
  code: z.string().length(6),
});

export const CardEditSchema = z.object({
  cardHolder: name,
  expiryDate: z.string().length(7, { message: 'Invalid expiry date' }),
  defaultCard: z.boolean().default(false),
});

export const CardAddSchema = z.object({
  cardHolder: name.max(32, { message: 'Name is too long' }),
  cardNumber: z
    .string()
    .min(15, { message: 'Card number must be at least 15 characters' })
    .max(19, { message: 'Card number cannot exceed 19 characters' }),
  expiryDate: z.string().length(7, { message: 'Invalid expiry date' }),
  cvc: z
    .string()
    .min(3)
    .max(4, { message: 'CVC must be between 3 and 4 characters long' }),
});

export const AddressSchema = z.object({
  fullName: name.max(32, { message: 'Name is too long' }),
  streetAddress: requiredString,
  streetOptional: z.string().optional(),
  city: requiredString,
  country: requiredString,
  states: z.string().optional(),
  zipCode: requiredString.trim(),
  phoneNumber: phoneNumber,
  deliveryInstructions: z.string().optional(),
  defaultAddress: z.boolean().default(false).optional(),
});

export const GenderSchema = z.object({
  gender: z.string(),
});

export const DateSchema = z.object({
  date: z.date(),
});
