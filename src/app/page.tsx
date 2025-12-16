import HomeSection from "@/components/sections/HomeSection";
import PageHead from "@/components/PageHead";
import PageHeader from "@/components/PageHeader";
import ProjectSection from "@/components/sections/ProjectSection";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/profileRepository";

export default async function Home() {
  const cachedProfile = await getProfile();
  return (
    <>
      <PageHead />
      <PageHeader profile={cachedProfile}/>
      <HomeSection profile={cachedProfile}/>
      <ProjectSection />
      <AboutSection profile={cachedProfile}/>
      <Footer profile={cachedProfile}/>
    </>
  );
    
}
