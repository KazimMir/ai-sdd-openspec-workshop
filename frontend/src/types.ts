export type Severity = "P1" | "P2" | "P3";

export type Status = "New" | "Triaged";

export interface Bug {
  id: string;
  title: string;
  description?: string;
  severity?: Severity;
  status: Status;
  createdAt: string;
}
