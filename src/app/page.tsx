import HomeSection from "@/components/sections/HomeSection";
import PageHead from "@/components/PageHead";
import PageHeader from "@/components/PageHeader";
import ProjectSection from "@/components/sections/ProjectSection";
import AboutSection from "@/components/sections/AboutSection";
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
      <HomeSection profile={cachedProfile}/>
      <ProjectSection />
      <ExperienceSection experiences={experiences} />
      <AboutSection profile={cachedProfile}/>
      <Footer profile={cachedProfile}/>
    </>
  );
    
}
