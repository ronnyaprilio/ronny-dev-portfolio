"use client";

import { Project } from "@/types/project";
import { useState, useEffect } from "react";

type Props = {
  open: boolean;
  collectionName: string;
  project: Project | null;
  onClose: () => void;
  onCancel?: () => void;
  onSaved: () => void;
};

export default function EditProjectDialog({open, collectionName, project, onClose, onCancel, onSaved }: Props) {
  const [form, setForm] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const isEdit = Boolean(form?._id);
  
  useEffect(() => {
    if (project) {
      setForm(project);
      setPreviewImage(project.image);
    }
  }, [project]);

  if (!open || !form) return null;

  const onChange = (key: keyof Project, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleCancel = () => {
    // reset UI-only state
    setPreviewImage(null);
    setImageFile(null);

    onCancel?.(); // optional hook
    onClose();    // tutup dialog
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Image upload failed");

    return res.json(); 
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageData = null;

      if (imageFile) {
        imageData = await uploadImage();
      }

      const res = await fetch(
        isEdit
          ? `/api/${collectionName}/${form._id}`
          : `/api/${collectionName}`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
            github: form.github,
            live_demo: form.live_demo,
            image: imageData?.url || form.image,
            image_public_id:
            imageData?.public_id || form.image_public_id,
          }),
        }
      );

      if (!res.ok) throw new Error("Save failed");

      onClose();
      onSaved();
    } finally {
      setLoading(false);
    }
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

        <div className="grid grid-cols-[140px_1fr] gap-4 items-start">
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Project Image
            </label>

            <label className="cursor-pointer block">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-lg mb-2 border hover:opacity-90 transition"
                />
              ) : form.image ? (
                <img
                  src={form.image}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-lg mb-2 border hover:opacity-90 transition"
                />
              ) : (
                <div className="w-full h-32 rounded-lg border border-dashed flex items-center justify-center text-xs text-gray-400 mb-2 hover:bg-gray-50 transition">
                  Click to upload
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setImageFile(file);
                  setPreviewImage(URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
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
        </div>

        <div>
          
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
            value={form.github || ""}
            onChange={(e) => onChange("github", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Live Demo URL
          </label>
          <input
            type="url"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent"
            value={form.live_demo || ""}
            onChange={(e) => onChange("live_demo", e.target.value)}
            placeholder="https://your-demo-site.com"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={handleCancel}
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
