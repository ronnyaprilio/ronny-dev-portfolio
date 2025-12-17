"use client";

import { Project } from "@/types/project";
import { useState, useEffect } from "react";

type Props = {
  open: boolean;
  collectionName: string;
  project: Project | null;
  onClose: () => void;
  onSaved: () => void;
};

export default function EditProjectDialog({open, collectionName, project, onClose, onSaved }: Props) {
  const [form, setForm] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const isEdit = Boolean(form?._id);
  
  useEffect(() => {
    if (project) {
      setForm(project);
    }
  }, [project]);

  if (!open || !form) return null;

  const onChange = (key: keyof Project, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    const res = await fetch(
      isEdit
        ? `/api/${collectionName}/${form._id}`
        : `/api/${collectionName}`,
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          image: form.image,
          description: form.description,
          github: form.github,
        }),
      }
    );

    if (!res.ok) throw new Error("Save failed");

    onClose();
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center text-primary">
      <form
        onSubmit={onSubmit}
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 space-y-4 animate-in fade-in zoom-in"
      >
        <h2 className="text-xl font-semibold text-gray-900">
          Edit Project
        </h2>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Title
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            value={form.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Image URL
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            value={form.image}
            onChange={(e) => onChange("image", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            className="w-full border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            GitHub URL
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            value={form.github}
            onChange={(e) => onChange("github", e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-white px-5 py-2 rounded-lg text-sm hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
