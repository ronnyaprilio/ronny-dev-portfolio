import { ProfileData } from "@/lib/profileData";

const AboutSection: React.FC<{profile: ProfileData}> = async ({profile}) => {
 return (
    <section id="about" className="py-20 bg-primary min-h-screen">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold mb-8">About Me</h2>
      {profile.about_me.split('\n').map((line, idx) => (
        <p className="text-xl max-w-2xl mx-auto p-4" key={idx}>{line}</p>
      ))}
    </div>
  </section>
);
};

export default AboutSection;