import ProjectsTable from "@/components/admin/projects/ProjectsTable";
import { PROJECT_COLLECTION_NAME } from "@/lib/projectsData";

export default async function EditProjects() {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">
                Edit Projects
            </h2>

            <ProjectsTable projectsCollectionName={PROJECT_COLLECTION_NAME} />
        </section>
    );
};