import GithubButton from "@/components/buttons/GithubButton";
import LiveDemoButton from "@/components/buttons/LiveDemoButton";

export default function ProjectSectionCard({
    project,
    onImageZoom
}: {
    project: {
        _id: string;
        title: string;
        description: string;
        image: string;
        github?: string;
        live_demo?: string;
    },
    onImageZoom: (imageSrc: string) => void
}) {
    return (
        <div
            key={project._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow fade-in relative flex flex-col h-113 overflow-hidden"
        >
            {/* Image Section */}
            <div className="p-4 pb-0">
                <div className="overflow-hidden rounded-xl border border-gray-100">
                    <img
                        src={
                            project.image
                                ? project.image
                                : "https://via.placeholder.com/400x250?text=Project"
                        }
                        alt={project.title}
                        className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() =>
                            onImageZoom(
                                project.image ||
                                "https://via.placeholder.com/400x250?text=Project"
                            )
                        }
                    />
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 break-words">
                    {project.title}
                </h3>

                <p className="text-gray-600 mb-4 flex-1 line-clamp-3">
                    {project.description}
                </p>

                {/* Spacer biar tombol selalu di bawah */}
                <div className="pb-16" />

                {/* Buttons */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3 justify-center">
                    <GithubButton githubLink={project.github} />
                    <LiveDemoButton liveDemoLink={project.live_demo} />
                </div>
            </div>
        </div>
    );
}