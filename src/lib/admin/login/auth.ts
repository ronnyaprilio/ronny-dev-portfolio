'use server';

import { Lucia } from 'lucia';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import { cookies } from "next/headers";
import clientPromise from '@/lib/mongodb';
import { notFound, redirect } from 'next/navigation';

let luciaInstance: Lucia | null = null;

async function initLucia() {
  if (luciaInstance) return luciaInstance;

  const client = await clientPromise;
  const dbName = process.env.DB_NAME || "UAT-MongoDB";
  const db = client.db(dbName);

  const adapter = new MongodbAdapter(
    db.collection(process.env.DB_TABLE_LUCIA_SESSIONS!),
    db.collection(process.env.DB_TABLE_LUCIA_USERS!)
  );

  luciaInstance = new Lucia(adapter, {
    sessionCookie: {
      expires: false,
      attributes: { secure: process.env.NODE_ENV === "production" }
    }
  });

  return luciaInstance;
}

export async function createAuthSession(userId: string) {
  const lucia = await initLucia();
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function verifyAuthentication() {
  const lucia = await initLucia();

  const cookie = (await cookies()).get(lucia.sessionCookieName);
  if (!cookie?.value) {
    return { user: null, session: null };
  }
  try {
    const result = await lucia.validateSession(cookie.value);
    return result;
  } catch (e) {
    console.error("[VERIFY_SESSION_ERROR]", e);
    return { user: null, session: null };
  }
}

export async function destroySession() {
  const lucia = await initLucia();
  const { session } = await verifyAuthentication();

  if (!session) return { error: "Unauthorized" };
  await lucia.invalidateSession(session.id);
  redirect(`/admin/${process.env.ADMIN_LOGIN_SLUG}/login`);
}

export async function requireAdminAuth(slug: string) {
  const validSlug = process.env.ADMIN_LOGIN_SLUG;
  if (slug !== validSlug) {
    notFound();
  }

  const authentication = await verifyAuthentication();

  if (!authentication?.user || !authentication?.session) {
    redirect(`/admin/${process.env.ADMIN_LOGIN_SLUG}/login`);
  }
  return authentication;
}