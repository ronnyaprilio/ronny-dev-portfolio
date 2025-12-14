import { ProfileData } from "@/types/profile";

const HomeSection: React.FC<{profile: ProfileData}> = ({profile}) => {
 return (
    <section id="home" className="h-screen flex items-center justify-center bg-linear-to-br from-primary to-secondary min-h-screen">
    <div className="text-center fade-in">
      <h1 className="text-5xl md:text-7xl font-bold mb-4 fade-in">{profile.greetings}</h1>
      <p className="text-xl md:text-2xl mb-8 hero-text fade-in">{profile.description}</p>
      <a href="#projects" className="inline-flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 hero-cta fade-in">
        View My Work <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </a>
    </div>
  </section>
);
};

export default HomeSection;