'use server';

import { cookies } from 'next/headers';
import { auth } from './auth';

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const sessionId =
    cookieStore.get(auth.sessionCookieName)?.value;

  if (!sessionId) {
    return null;
  }

  const { user, session } =
    await auth.validateSession(sessionId);

  if (!session) {
    return null;
  }

  return user;
}