import { auth } from "./authentication";
import { notFound, redirect } from "next/navigation";

export async function verifyAuthentication() {
  const session = await auth();

  if (!session || !session.user) {
    return { user: null, session: null };
  }

  return {
    user: session.user,
    session,
  };
}

export async function requireAdminAuth(slug: string) {
  const validSlug = process.env.ADMIN_LOGIN_SLUG;

  if(slug !== validSlug){
    notFound();
  }

  const session = await auth();

  if (!session || !session.user) {
    redirect(`/admin/${validSlug}/login`);
  }

  if (session.user.role !== "admin") {
    redirect(`/admin/${validSlug}/login`);
  }

  return session;
}