import { Project } from "@/types/project";

export async function fetchProjects(collectionName: string): Promise<Project[]> {
  const res = await fetch(`/api/${collectionName}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data: Project[] = await res.json();

  return data.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));
}