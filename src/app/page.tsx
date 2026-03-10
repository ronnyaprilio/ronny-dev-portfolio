import AboutSection from "@/components/sections/AboutSection";
import PageHead from "@/components/PageHead";
import PageHeader from "@/components/PageHeader";
import ProjectSection from "@/components/sections/ProjectSection";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/profileRepository";
import ExperienceSection from "@/components/sections/ExperienceSection";
import { getExperience } from "@/lib/experienceRepository";

export default async function Home() {
  const cachedProfile = await getProfile();
  const experiences = await getExperience();
  return (
    <>
      <PageHead />
      <PageHeader profile={cachedProfile}/>
      <AboutSection profile={cachedProfile}/>
      <ProjectSection />
      <ExperienceSection experiences={experiences} />
      <Footer profile={cachedProfile}/>
    </>
  );

}
