import HomeSection from "@/components/sections/HomeSection";
import PageHead from "@/components/PageHead";
import PageHeader from "@/components/PageHeader";
import ProjectSection from "@/components/sections/ProjectSection";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/Footer";
import { getCachedProfile } from "@/lib/profileCache";

export default async function Home() {
  const cachedProfile = await getCachedProfile();
  return (
    <>
      <PageHead />
      <PageHeader profile={cachedProfile}/>
      <HomeSection profile={cachedProfile}/>
      <ProjectSection/>
      <AboutSection profile={cachedProfile}/>
      <Footer profile={cachedProfile}/>
    </>
  );
    
}
