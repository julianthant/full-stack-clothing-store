import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const localEnvironment = process.env.NODE_ENV === 'development';

export const sendTwoFAEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'mail@julianhein.me',
    to: email,
    subject: 'Verify your email',
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendVerficationEmail = async (email: string, token: string) => {
  const confirmLink = localEnvironment
    ? `http://localhost:3000/auth/new-verification?token=${token}`
    : `https://${process.env.APP_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'mail@julianhein.me',
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`,
  });
};

export const sendPasswordEmail = async (email: string, token: string) => {
  const resendLink = localEnvironment
    ? `http://localhost:3000/auth/new-password?token=${token}`
    : `https://${process.env.APP_URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'mail@julianhein.me',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resendLink}">here</a> to reset your password.</p>`,
  });
};

export const sendLoggedInPasswordEmail = async (
  email: string,
  token: string
) => {
  const resendLink = localEnvironment
    ? `http://localhost:3000/forms/change-new-password-form?token=${token}`
    : `https://${process.env.APP_URL}/forms/change-new-password-form?token=${token}`;

  await resend.emails.send({
    from: 'mail@julianhein.me',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resendLink}">here</a> to reset your password.</p>`,
  });
};

export const sendLoggedInVerficationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = localEnvironment
    ? `http://localhost:3000/forms/new-email-verification-form?token=${token}`
    : `https://${process.env.APP_URL}/forms/new-email-verification-form?token=${token}`;

  await resend.emails.send({
    from: 'mail@julianhein.me',
    to: email,
    subject: 'Verify new email',
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your new email address.</p>`,
  });
};
