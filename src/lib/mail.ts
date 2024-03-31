import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFAEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'onoarding@resend.dev',
    to: email,
    subject: 'Verify your email',
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendVerficationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'onoarding@resend.dev',
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendPasswordEmail = async (email: string, token: string) => {
  const resendLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'onoarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resendLink}">here</a> to reset your password.</p>`,
  });
};

export const sendLoggedInPasswordEmail = async (
  email: string,
  token: string
) => {
  const resendLink = `http://localhost:3000/settings/edit/new-password?token=${token}`;

  await resend.emails.send({
    from: 'onoarding@resend.dev',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${resendLink}">here</a> to reset your password.</p>`,
  });
};

export const sendLoggedInVerficationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `http://localhost:3000/settings/edit/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'onoarding@resend.dev',
    to: email,
    subject: 'Verify your email',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
