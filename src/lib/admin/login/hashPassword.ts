'use server';

import crypto from 'node:crypto';

export async function hashUserPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.scryptSync(password, salt, 64);

  return `${hashedPassword.toString('hex')}:${salt}`;
}

export async function verifyPassword( storedPassword: string, suppliedPassword: string): Promise<boolean> {
  const [hashedPassword, salt] = storedPassword.split(':');

  if (!hashedPassword || !salt) return false;

  const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
  const suppliedPasswordBuf = crypto.scryptSync(
    suppliedPassword,
    salt,
    64
  );

  return crypto.timingSafeEqual(
    hashedPasswordBuf,
    suppliedPasswordBuf
  );
}