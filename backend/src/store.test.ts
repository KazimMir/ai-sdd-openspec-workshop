import { beforeEach, describe, expect, it } from "vitest";
import { bugStore } from "./store.js";

describe("bugStore", () => {
  beforeEach(() => {
    bugStore.reset();
  });

  it("creates a bug with a unique id, default status, and timestamp", () => {
    const bug = bugStore.create({ title: "Login fails" });

    expect(bug.id).toBeTruthy();
    expect(bug.title).toBe("Login fails");
    expect(bug.status).toBe("New");
    expect(bug.severity).toBeUndefined();
    expect(bug.description).toBeUndefined();
    expect(() => new Date(bug.createdAt)).not.toThrow();
    expect(Number.isNaN(Date.parse(bug.createdAt))).toBe(false);
  });

  it("stores optional description and severity when provided", () => {
    const bug = bugStore.create({
      title: "Crash on save",
      description: "Click save twice",
      severity: "P2",
    });

    expect(bug.description).toBe("Click save twice");
    expect(bug.severity).toBe("P2");
  });

  it("assigns a different id to each created bug", () => {
    const a = bugStore.create({ title: "A" });
    const b = bugStore.create({ title: "B" });

    expect(a.id).not.toBe(b.id);
  });

  it("returns all created bugs via getAll", () => {
    bugStore.create({ title: "A" });
    bugStore.create({ title: "B" });

    expect(bugStore.getAll()).toHaveLength(2);
  });

  it("clears all bugs on reset", () => {
    bugStore.create({ title: "A" });
    bugStore.reset();

    expect(bugStore.getAll()).toHaveLength(0);
  });
});
