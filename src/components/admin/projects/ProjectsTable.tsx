"use client";

import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import EditProjectDialog from "./EditProjectDialog";
import { InlineLoader } from "@/components/InlineLoader";

const EMPTY_PROJECT: Project = {
    _id: "",
    title: "",
    image: "",
    image_public_id: "",
    description: "",
    github: "",
    live_demo: "",
};

async function fetchProjects(projectsCollectionName: string, setProjects: (projects: Project[]) => void, setLoading: (loading: boolean) => void, setError: (error: string | null) => void) {
    try {
        const res = await fetch(`/api/${projectsCollectionName}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }

        const data: Project[] = await res.json();
        console.log("Fetched projects:", data);

        const normalized = data.map((p) => ({
            ...p,
            _id: p._id.toString(),
        }));

        setProjects(normalized);
    } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
    } finally {
        setLoading(false);
    }
}

export default function ProjectsTable({projectsCollectionName}: {projectsCollectionName: string}) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Project | null>(null);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        fetchProjects(projectsCollectionName, setProjects, setLoading, setError);
    }, []);

    const onEdit = (project: Project) => {
        setSelected({ ...project });
        setOpen(true);
    };  

    const onDelete = async (id: string) => {
        if (!confirm("Delete this project?")) return;

        const res = await fetch(`/api/${projectsCollectionName}/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            alert("Failed to delete project");
            return;
        }
        fetchProjects(projectsCollectionName, setProjects, setLoading, setError);
    };

    return ( <>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4">
                <button disabled={loading} className="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                    onClick={() => {
                        setSelected(EMPTY_PROJECT);
                        setOpen(true);
                    }}>
                    Add Project
                </button>
            </div>

            <table className="w-full text-sm table-fixed">
                <thead className="bg-gray-900 text-white">
                <tr>
                    <th className="px-6 py-3 text-left font-medium w-1/5">Title</th>
                    <th className="px-6 py-3 text-left font-medium w-1/12">Image</th>
                    <th className="px-6 py-3 text-left font-medium w-1/5">Description</th>
                    <th className="px-6 py-3 text-left font-medium w-1/12">GitHub</th>
                    <th className="px-6 py-3 text-left font-medium w-1/12">Live Demo</th>
                    <th className="px-6 py-3 text-left font-medium w-1/6">Actions</th>
                </tr>
                </thead>

                <tbody className="text-gray-700 [&>tr:nth-child(even)]:bg-gray-50 [&>tr:hover]:bg-gray-100">
                    {loading && (
                        <tr>
                        <td colSpan={6} className="py-10">
                            <div className="flex flex-col items-center gap-3 text-gray-400">
                            <InlineLoader />
                            <span>Loading projects...</span>
                            </div>
                        </td>
                        </tr>
                    )}

                    {!loading && error && (
                        <tr>
                        <td colSpan={5} className="py-8 text-center text-red-500">
                            {error}
                        </td>
                        </tr>
                    )}

                    {!loading && !error && projects.length === 0 && (
                        <tr>
                        <td colSpan={5} className="py-8 text-center text-gray-400">
                            No projects found
                        </td>
                        </tr>
                    )}

                    {!loading && !error && projects.map((project) => (
                        <tr key={project._id} className="odd:bg-white even:bg-gray-50">
                            <td className="px-6 py-4 font-medium max-w-xs truncate">{project.title}</td>
                            <td className="px-6 py-4">
                                <img
                                    src={
                                        project.image
                                        ? `${project.image}`
                                        : "https://via.placeholder.com/400x250?text=Project"
                                    }
                                    alt={project.title}
                                    className="w-24 h-16 object-cover rounded-md border"
                                />
                            </td>
                            <td className="px-6 py-4 max-w-sm text-xs text-gray-600 line-clamp-2">
                                {project.description}
                            </td>                        
                            <td className="px-6 py-4">
                                {project.github ?
                                    <a
                                    href={project.github}
                                    target="_blank"
                                    className="text-accent hover:underline"
                                    >
                                    Repo
                                    </a>
                                 : (
                                    <span className="text-gray-400">—</span>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {project.live_demo ? (
                                    <a
                                    href={project.live_demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent hover:underline"
                                    >
                                    Demo
                                    </a>
                                ) : (
                                    <span className="text-gray-400">—</span>
                                )}
                            </td>
                            <td className="px-6 py-4 space-x-2">
                                <button
                                className="bg-accent text-white px-3 py-1 rounded-md text-xs"
                                onClick={() => onEdit(project)}
                                >
                                Edit
                                </button>
                                <button
                                className="bg-red-500 text-white px-3 py-1 rounded-md text-xs"
                                onClick={() => onDelete(project._id)}
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <EditProjectDialog
            open={open}
            collectionName={projectsCollectionName}
            project={selected}
            onClose={() => setOpen(false)}
            onSaved={fetchProjects.bind(null, projectsCollectionName, setProjects, setLoading, setError)}
        />
    </>
    );
}
