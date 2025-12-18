import ProjectSectionCard from '@/lib/projects/ProjectSectionCard';
import { getProjects } from '@/lib/projectsData';
import { Project } from '@/types/project';

const ProjectSection = async () => {
  const projectsFromDb = await getProjects();

  const projects: Project[] = projectsFromDb.map(p => ({
    ...p, 
    _id: p._id.toString(),
  }));

  return (
    <section
      id="projects"
      className="py-20 bg-secondary min-h-screen flex items-center"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          My Projects
        </h2>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectSectionCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-56">
            <p className="text-primary/80 text-lg italic text-center">
              No projects available at the moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;