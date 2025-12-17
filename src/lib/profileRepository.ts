"use server";
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
    PROFILE_COLLECTION_NAME, "main-profile"
  );

  if (!profile) {
    throw new Error("Profile data not found");
  }
  return profile;
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
] as const;

export async function saveProfile(formData: FormData) {
  const data = Object.fromEntries(
    PROFILE_FIELDS.map((field) => [
      field,
      formData.get(field)?.toString() ?? "",
    ])
  ) as Partial<ProfileData>;

  await updateById<ProfileData>(
    PROFILE_COLLECTION_NAME, "main-profile", data
  );

  clearProfileCache();
  revalidatePath("/");
}

export async function clearProfileCache() {
  cachedProfile = null;
}