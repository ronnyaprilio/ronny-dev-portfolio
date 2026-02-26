"use client";

import { useEffect, useState } from "react";
import { InlineLoader } from "@/components/InlineLoader";
import { Experience } from "@/types/experience";
import EditExperienceDialog from "./EditExperienceDialog";

const EMPTY_EXPERIENCE: Experience = {
  _id: "",
  period: "",
  displayOrder: 0,
  role: "",
  company: "",
  highlights: [],
};

async function fetchExperiences(
  collectionName: string,
  setExperiences: (data: Experience[]) => void,
  setLoading: (v: boolean) => void,
  setError: (v: string | null) => void
) {
  try {
    setLoading(true);

    const res = await fetch(`/api/${collectionName}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch experiences");

    const data: Experience[] = await res.json();

    setExperiences(
      data
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((e) => ({
          ...e,
          _id: e._id.toString(),
        }))
    );
  } catch (err) {
    console.error(err);
    setError("Failed to load experience data");
  } finally {
    setLoading(false);
  }
}

export default function ExperienceTable({
  collectionName,
}: {
  collectionName: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Experience | null>(null);

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences(collectionName, setExperiences, setLoading, setError);
  }, [collectionName]);

  const onEdit = (exp: Experience) => {
    setSelected({ ...exp });
    setOpen(true);
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;

    const res = await fetch(`/api/${collectionName}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete experience");
      return;
    }

    fetchExperiences(collectionName, setExperiences, setLoading, setError);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-between px-6 py-4">
          <button
            className="bg-accent text-white px-4 py-2 rounded-lg"
            onClick={() => {
              setSelected(EMPTY_EXPERIENCE);
              setOpen(true);
            }}
          >
            Add Experience
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Display Order</th>
              <th className="px-6 py-3 text-left">Period</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-left">Company</th>
              <th className="px-6 py-3 text-left">Highlights</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="text-primary  [&>tr:nth-child(even)]:bg-gray-50 [&>tr:hover]:bg-gray-100">
            {loading && (
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  <InlineLoader />
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              experiences.map((exp) => (
                <tr key={exp._id}>
                  <td className="px-6 py-4">{exp.displayOrder}</td>
                  <td className="px-6 py-4">{exp.period}</td>
                  <td className="px-6 py-4 font-medium">{exp.role}</td>
                  <td className="px-6 py-4">{exp.company}</td>
                  <td className="px-6 py-4 text-xs">
                    <ul className="list-disc ml-4">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      className="bg-accent text-white px-3 py-1 rounded text-xs"
                      onClick={() => onEdit(exp)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                      onClick={() => onDelete(exp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <EditExperienceDialog
        open={open}
        collectionName={collectionName}
        experience={selected}
        onClose={() => setOpen(false)}
        onSaved={() =>
          fetchExperiences(collectionName, setExperiences, setLoading, setError)
        }
      />
    </>
  );
}