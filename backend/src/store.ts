import type { Bug, CreateBugInput } from "./types.js";

class BugStore {
  private bugs: Bug[] = [];
  private nextId = 1;

  create(input: CreateBugInput): Bug {
    const bug: Bug = {
      id: String(this.nextId++),
      title: input.title,
      description: input.description,
      severity: input.severity,
      status: "New",
      createdAt: new Date().toISOString(),
    };
    this.bugs.push(bug);
    return bug;
  }

  getAll(): Bug[] {
    return [...this.bugs];
  }

  reset(): void {
    this.bugs = [];
    this.nextId = 1;
  }
}

export const bugStore = new BugStore();
