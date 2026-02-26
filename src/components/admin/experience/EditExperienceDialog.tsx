"use client";

import { Experience } from "@/types/experience";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  collectionName: string;
  experience: Experience | null;
  onClose: () => void;
  onCancel?: () => void;
  onSaved: () => void;
};

export default function EditExperienceDialog({
  open,
  collectionName,
  experience,
  onClose,
  onCancel,
  onSaved,
}: Props) {
  const [form, setForm] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(form?._id);

  useEffect(() => {
  if (experience) {
      setForm({
        _id: experience._id ?? "",
        displayOrder: experience.displayOrder ?? 0,
        period: experience.period ?? "",
        role: experience.role ?? "",
        company: experience.company ?? "",
        highlights: experience.highlights ?? [],
      });
    }
  }, [experience]);

  if (!open || !form) return null;

  const onChange = <K extends keyof Experience>(
    key: K,
    value: Experience[K]
  ) => {
    setForm({ ...form, [key]: value });
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        isEdit
          ? `/api/${collectionName}/${form._id}`
          : `/api/${collectionName}`,
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
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
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-900">
          {isEdit ? "Edit Experience" : "Add Experience"}
        </h2>

        <div>
          <label className="text-sm text-gray-500">Display Order</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-primary"
            value={form.displayOrder}
            onChange={(e) => onChange("displayOrder", parseInt(e.target.value) || 0)}
            placeholder="1"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Period</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-primary"
            value={form.period}
            onChange={(e) => onChange("period", e.target.value)}
            placeholder="2023 — Present"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Role</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-primary"
            value={form.role}
            onChange={(e) => onChange("role", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Company</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-primary"
            value={form.company}
            onChange={(e) => onChange("company", e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Highlights (one per line)
          </label>
          <textarea
            rows={4}
            className="w-full border rounded-lg px-3 py-2 text-primary"
            value={form.highlights.join("\n")}
            onChange={(e) =>
              onChange(
                "highlights",
                e.target.value
                  .split("\n")
                  .map((v) => v.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm text-gray-600"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-accent text-white px-5 py-2 rounded-lg text-sm"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}