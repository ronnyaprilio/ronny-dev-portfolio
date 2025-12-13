import { ProfileData } from "@/lib/profileData";

const PageHeader: React.FC<{ profile?: ProfileData }> = async ({profile}) => {
  return (
    <header className="fixed top-0 w-full bg-primary/80 backdrop-blur-md z-10">
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <a href="#home" className="text-xl font-bold">{profile? profile.name ? profile.name : "Profile" : "Profile"}</a>
      <ul className="flex space-x-6">
        <li><a href="#projects" className="hover:text-accent">Projects</a></li>
        <li><a href="#about" className="hover:text-accent">About</a></li>
      </ul>
    </nav>
  </header>
  );
};

export default PageHeader;