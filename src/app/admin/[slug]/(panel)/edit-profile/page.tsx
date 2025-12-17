import EditProfileClient from "@/components/admin/profile/EditProfileForm";
import { getProfile } from "@/lib/profileRepository";

export default async function EditProfilePage() {
  const profile = await getProfile();

  return <EditProfileClient profile={profile} />;
}