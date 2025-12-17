"use client";

import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import EditProjectDialog from "./EditProjectDialog";

const EMPTY_PROJECT: Project = {
  _id: "",
  title: "",
  image: "",
  description: "",
  github: "",
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

    if (loading) {
        return <p className="text-center">Loading projects…</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

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
                <button className="bg-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
                onClick={() => {
                    setSelected(EMPTY_PROJECT);
                    setOpen(true);
                }}>
                Add Project
                </button>
            </div>

            <table className="w-full text-sm">
                <thead className="bg-gray-900 text-white">
                <tr>
                    <th className="px-6 py-3 text-left font-medium">Title</th>
                    <th className="px-6 py-3 text-left font-medium">Image</th>
                    <th className="px-6 py-3 text-left font-medium">Description</th>
                    <th className="px-6 py-3 text-left font-medium">GitHub</th>
                    <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
                </thead>

                <tbody className="text-gray-700 [&>tr:nth-child(even)]:bg-gray-50 [&>tr:hover]:bg-gray-100">
                {projects.length === 0 && (
                    <tr className="border-t odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                    <td
                        colSpan={5}
                        className="px-6 py-8 text-center text-gray-400"
                    >
                        No projects found
                    </td>
                    </tr>
                )}

                {projects.map((project) => (
                    <tr key={project._id} className="odd:bg-white even:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{project.title}</td>
                    <td className="px-6 py-4">{project.image}</td>
                    <td className="px-6 py-4 max-w-xs truncate">{project.description}</td>
                    <td className="px-6 py-4">
                        <a
                        href={project.github}
                        target="_blank"
                        className="text-accent hover:underline"
                        >
                        Repo
                        </a>
                    </td>

                    <td className="px-6 py-4 space-x-2">
                        <button className="bg-accent text-white px-3 py-1 rounded-md text-xs" onClick={() => onEdit(project)}>
                        Edit
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded-md text-xs" onClick={() => onDelete(project._id)}>
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
