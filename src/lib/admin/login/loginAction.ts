'use server';

import { redirect } from 'next/navigation';
import { signIn } from './authentication';

export async function login(_: any, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
  } catch {
    return { error: "Invalid username or password" };
  }

  redirect(`/admin/${process.env.ADMIN_LOGIN_SLUG}`);
}