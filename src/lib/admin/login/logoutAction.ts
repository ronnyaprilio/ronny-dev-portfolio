"use server";

import { signOut } from "./authentication";

export async function logout() {
  await signOut({ redirect: true });
}