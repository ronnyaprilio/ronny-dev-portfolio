import "server-only";

import { Experience } from "@/types/experience";
import { findAll } from "./db/repository";

export const EXPERIENCE_COLLECTION_NAME = process.env.DB_TABLE_EXPERIENCE_COLLECTION_NAME!;

export async function getExperience(): Promise<Experience[]> {
  const experience = await findAll<Experience>(
    EXPERIENCE_COLLECTION_NAME
  );

  if (!experience) {
    throw new Error("Profile data not found");
  }
  return experience;
}