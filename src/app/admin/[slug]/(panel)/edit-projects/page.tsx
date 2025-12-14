const EditProjects: React.FC<AdminPageProps> = () => {
    return (
        <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">
                Edit Projects
            </h2>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="mb-4">
                <button className="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
                    Add New Project
                </button>
                </div>

                <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-50 text-primary text-sm">
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">GitHub</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-t">
                    <td className="px-4 py-2">Project 1</td>
                    <td className="px-4 py-2">image1.jpg</td>
                    <td className="px-4 py-2">
                        Description of project 1
                    </td>
                    <td className="px-4 py-2">
                        https://github.com/project1
                    </td>
                    <td className="px-4 py-2 space-x-2">
                        <button className="bg-accent text-white px-2 py-1 rounded">
                        Edit
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                        </button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </section>
    );
};

export default EditProjects;