import { getProjects } from '@/lib/projectsData';

const ProjectSection = async () => {
  const projectsFromDb = await getProjects();

  const projects: Project[] = projectsFromDb.map(p => ({
    ...p, 
    _id: p._id.toString(),
  }));

  return (
    <section id="projects" className="py-20 bg-secondary min-h-screen">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow fade-in"
            >
              <img
                src={`${process.env.CLOUDINARY_URL}${project.image}` || 'https://via.placeholder.com/400x250?text=Project'}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;