import type { CreateBugInput, Severity } from "./types.js";

const SEVERITIES: Severity[] = ["P1", "P2", "P3"];
const TITLE_MAX = 100;

export interface ValidationError {
  field: string;
  message: string;
}

export type ValidationResult =
  | { ok: true; value: CreateBugInput }
  | { ok: false; error: ValidationError };

export function validateCreateBug(body: unknown): ValidationResult {
  const input = (body ?? {}) as Record<string, unknown>;
  const { title, description, severity } = input;

  if (typeof title !== "string" || title.trim().length === 0) {
    return { ok: false, error: { field: "title", message: "Title is required" } };
  }
  if (title.length > TITLE_MAX) {
    return {
      ok: false,
      error: { field: "title", message: `Title must be ${TITLE_MAX} characters or fewer` },
    };
  }

  if (severity !== undefined && !SEVERITIES.includes(severity as Severity)) {
    return {
      ok: false,
      error: { field: "severity", message: "Severity must be one of P1, P2, P3" },
    };
  }

  if (description !== undefined && typeof description !== "string") {
    return {
      ok: false,
      error: { field: "description", message: "Description must be text" },
    };
  }

  return {
    ok: true,
    value: {
      title,
      description: description as string | undefined,
      severity: severity as Severity | undefined,
    },
  };
}
