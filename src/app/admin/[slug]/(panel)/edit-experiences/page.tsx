import ExperienceTable from "@/components/admin/experience/ExperienceTable";
import { EXPERIENCE_COLLECTION_NAME } from "@/lib/experienceRepository";

export default function EditExperiences() {
    const experiencesCollectionName = EXPERIENCE_COLLECTION_NAME;
    return (
        <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">
                Edit Experiences
            </h2>
            <ExperienceTable collectionName={experiencesCollectionName} />
        </section>
    );
};