import { ProfileData } from '@/types/profile';
import { getProfile } from './profileData';

let cachedProfile: ProfileData | null = null;

export async function getCachedProfile(): Promise<ProfileData> {
  if (cachedProfile) return cachedProfile;
  const cachedProjects = await getProfile();
  return cachedProjects;
}

export function clearProfileCache() {
  cachedProfile = null;
}