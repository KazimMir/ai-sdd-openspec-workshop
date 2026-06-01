import { beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "./app.js";
import { bugStore } from "./store.js";

const app = createApp();

describe("POST /api/bugs (valid input)", () => {
  beforeEach(() => {
    bugStore.reset();
  });

  it("creates a bug from a title only and returns 201 with defaults", async () => {
    const res = await request(app)
      .post("/api/bugs")
      .send({ title: "Login button does nothing" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeTruthy();
    expect(res.body.title).toBe("Login button does nothing");
    expect(res.body.status).toBe("New");
    expect(res.body.severity).toBeUndefined();
    expect(Number.isNaN(Date.parse(res.body.createdAt))).toBe(false);
    expect(bugStore.getAll()).toHaveLength(1);
  });

  it("creates a bug with all fields", async () => {
    const res = await request(app).post("/api/bugs").send({
      title: "Crash on save",
      description: "Repro: click save twice",
      severity: "P2",
    });

    expect(res.status).toBe(201);
    expect(res.body.description).toBe("Repro: click save twice");
    expect(res.body.severity).toBe("P2");
    expect(res.body.status).toBe("New");
  });

  it("accepts a title at the 100 character boundary", async () => {
    const title = "a".repeat(100);
    const res = await request(app).post("/api/bugs").send({ title });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(title);
  });
});

describe("POST /api/bugs (validation)", () => {
  beforeEach(() => {
    bugStore.reset();
  });

  it("rejects a missing title with 400 and stores nothing", async () => {
    const res = await request(app).post("/api/bugs").send({});

    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/title is required/i);
    expect(bugStore.getAll()).toHaveLength(0);
  });

  it("rejects an empty/whitespace title with 400", async () => {
    const res = await request(app).post("/api/bugs").send({ title: "   " });

    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/title is required/i);
    expect(bugStore.getAll()).toHaveLength(0);
  });

  it("rejects a title over 100 characters with 400 and stores nothing", async () => {
    const res = await request(app)
      .post("/api/bugs")
      .send({ title: "a".repeat(101) });

    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/100 characters/i);
    expect(bugStore.getAll()).toHaveLength(0);
  });

  it("rejects an invalid severity with 400 and stores nothing", async () => {
    const res = await request(app)
      .post("/api/bugs")
      .send({ title: "Valid", severity: "P9" });

    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/severity/i);
    expect(bugStore.getAll()).toHaveLength(0);
  });
});
