import "server-only";

import { ProfileData } from '@/types/profile';
import { revalidatePath } from 'next/cache';
import { findById, updateById } from './db/repository';

let cachedProfile: ProfileData | null = null;

const PROFILE_COLLECTION_NAME = process.env.DB_TABLE_PROFILE_COLLECTION_NAME!;

export async function getProfile(): Promise<ProfileData> {
  if (cachedProfile) {
    return cachedProfile;
  }

  const profile = await findById<ProfileData>(
    PROFILE_COLLECTION_NAME,
    "main-profile"
  );

  if (!profile) {
    throw new Error("Profile data not found");
  }

  const normalized: ProfileData = {
    ...profile,
  };

  cachedProfile = normalized;
  return normalized;
}

const PROFILE_FIELDS = [
  "name",
  "greetings",
  "description",
  "about_me",
  "metadata_title",
  "metadata_description",
  "copyright",
  "github",
  "linkedin",
  "email",
  "upwork",
  "keywords",
] as const;

export async function saveProfile(formData: FormData) {
  const data: Partial<ProfileData> = {};

  for (const field of PROFILE_FIELDS) {
    const raw = formData.get(field);
    const value = typeof raw === "string" ? raw : "";
    data[field] = value;
  }

  await updateById<ProfileData>(
    PROFILE_COLLECTION_NAME,
    "main-profile",
    data
  );

  clearProfileCache();
  revalidatePath("/");
}

export async function clearProfileCache() {
  cachedProfile = null;
}