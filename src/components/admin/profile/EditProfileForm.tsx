"use client"

import InputText from "@/components/admin/InputText";
import SaveProfile from "@/components/admin/profile/SaveProfileButton";
import { saveProfileAction } from "@/lib/admin/profile/action";
import { ProfileData } from "@/types/profile";
import { useState } from "react";

export default function EditProfileClient({ profile }: {profile: ProfileData}) {
  const [form, setForm] = useState<ProfileData>(profile);
  function handleFormChange(
    e: React.FormEvent<HTMLFormElement>
  ) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    if (!target.name) return;
    setForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-primary mb-4">
        Edit Profile
      </h2>

      <form className="bg-white p-6 rounded-xl shadow-md text-primary" action={saveProfileAction} onChange={handleFormChange}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <InputText label="Name" name="name" defaultValue={form.name}/>
          <InputText label="Greetings" name="greetings" defaultValue={form.greetings}/>

          <div className="md:col-span-2">
            <InputText label="Description" name="description"  defaultValue={form.description}/>
          </div>

          <div className="md:col-span-2">
            <InputText label="About Me" name="about_me" rows={3}  defaultValue={form.about_me}/>
          </div>

          <InputText label="Metadata Title" name="metadata_title"  defaultValue={form.metadata_title}/>
          <InputText label="Metadata Description" name="metadata_description"  defaultValue={form.metadata_description}/>
          <InputText label="Copyright" name="copyright"  defaultValue={form.copyright}/>
          <InputText label="GitHub" name="github"  defaultValue={form.github}/>
          <InputText label="LinkedIn" name="linkedin"  defaultValue={form.linkedin}/>
          <InputText label="Email" name="email" defaultValue={form.email} />

        </div>

        <div className="mt-6">
          <SaveProfile />
        </div>
      </form>
    </section>
  );
};