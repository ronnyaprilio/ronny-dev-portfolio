'use server';

import { redirect } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import { cookies } from 'next/headers';
import { verifyPassword } from './hashPassword';
import { auth } from './auth';

type LoginState = {
  error?: string;
};

export async function login( _: LoginState | null,formData: FormData): Promise<LoginState | void> {
  const username = formData.get('username')?.toString();
  const password = formData.get('password')?.toString();

  if (!username || !password) {
    return { error: 'Username and password are required' };
  }

  let user;

  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection('users');

    user = await users.findOne({ username });

    if (!user || !user.password) {
      return { error: 'Invalid username or password' };
    }

    const valid = await verifyPassword(user.password, password);

    if (!valid) {
      return { error: 'Invalid username or password' };
    }

    const session = await auth.createSession(user._id.toString(), {});
    const sessionCookie = auth.createSessionCookie(session.id);

    const cookieStore = await cookies();
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error) {
    console.error('[LOGIN_ERROR]', error);
    return { error: 'Something went wrong. Please try again.' };
  }

  redirect(`/admin/${process.env.ADMIN_LOGIN_SLUG}`);
}