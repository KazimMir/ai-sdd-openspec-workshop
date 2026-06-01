import { useState } from "react";
import { CreateBugForm } from "./CreateBugForm.tsx";
import type { Bug } from "./types.ts";

export default function App() {
  const [lastCreated, setLastCreated] = useState<Bug | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <h1 className="text-xl font-semibold">Bug Tracker</h1>
          <p className="text-sm text-slate-500">Report a new bug</p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-4 px-6 py-8">
        <CreateBugForm onCreated={setLastCreated} />

        {lastCreated && (
          <p
            role="status"
            className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700"
          >
            Created bug "{lastCreated.title}" with status {lastCreated.status}.
          </p>
        )}
      </main>
    </div>
  );
}
