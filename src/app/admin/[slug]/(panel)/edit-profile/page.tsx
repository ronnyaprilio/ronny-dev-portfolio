import Loading from "@/app/loading";
import EditProfileClient from "@/components/admin/profile/EditProfileForm";
import { getProfile } from "@/lib/profileRepository";
import { Suspense } from "react";

export default async function EditProfilePage() {
  const profile = await getProfile();

  return (
    <Suspense fallback={<Loading />}>
      <EditProfileClient profile={profile} />
    </Suspense>
  );
}