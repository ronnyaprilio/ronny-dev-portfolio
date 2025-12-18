import GithubButton from "@/components/buttons/GithubButton";
import LiveDemoButton from "@/components/buttons/LiveDemoButton";

export default function ProjectSectionCard( { project }
    : { project: { _id: string; title: string; description: string; image: string; github?: string; live_demo?: string } }) {
    return (
        <div
        key={project._id}
        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow fade-in relative flex flex-col"
        >
            <div
                key={project._id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow fade-in flex flex-col h-full"
            >
                <div className="overflow-hidden">
                    <img
                    src={
                        project.image
                        ? `${project.image}`
                        : "https://via.placeholder.com/400x250?text=Project"
                    }
                    alt={project.title}
                    className="w-full h-48 object-cover"
                    />
                </div>

                <div className="p-6 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 wrap-break-word">
                    {project.title}
                    </h3>

                    <p className="text-gray-600 mb-4">
                    {project.description}
                    </p>

                    <div className="pb-16" />

                    <div className="absolute bottom-6 left-6 right-6 flex gap-3 justify-center">
                        <GithubButton githubLink={project.github} />
                        <LiveDemoButton liveDemoLink={project.live_demo} />
                    </div>
                </div>
            </div>
        </div>
    );
}