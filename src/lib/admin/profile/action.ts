"use server";

import { saveProfile } from "@/lib/profileRepository";

export async function saveProfileAction(formData: FormData) {
  await saveProfile(formData);
}