import { useState, type FormEvent } from "react";
import type { Bug, Severity } from "./types.ts";

interface CreateBugFormProps {
  onCreated: (bug: Bug) => void;
}

const SEVERITIES: Severity[] = ["P1", "P2", "P3"];

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm " +
  "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

export function CreateBugForm({ onCreated }: CreateBugFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<"" | Severity>("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/bugs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: description || undefined,
          severity: severity || undefined,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error?.message ?? "Could not create bug");
        return;
      }

      onCreated(data as Bug);
      setTitle("");
      setDescription("");
      setSeverity("");
    } catch {
      setError("Could not reach the server");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Short summary of the bug"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Description <span className="text-slate-400">(optional)</span>
        </label>
        <textarea
          id="description"
          value={description}
          rows={3}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Steps to reproduce, expected vs actual"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="severity"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Severity <span className="text-slate-400">(optional)</span>
        </label>
        <select
          id="severity"
          value={severity}
          onChange={(e) => setSeverity(e.target.value as "" | Severity)}
          className={inputClass}
        >
          <option value="">Untriaged</option>
          {SEVERITIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {submitting ? "Creating..." : "Create Bug"}
      </button>
    </form>
  );
}
