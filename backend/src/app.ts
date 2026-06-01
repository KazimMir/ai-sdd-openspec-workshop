import express, { type Express } from "express";
import { bugStore } from "./store.js";
import { validateCreateBug } from "./validation.js";

export function createApp(): Express {
  const app = express();
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.post("/api/bugs", (req, res) => {
    const result = validateCreateBug(req.body);
    if (!result.ok) {
      res.status(400).json({ error: result.error });
      return;
    }
    const bug = bugStore.create(result.value);
    res.status(201).json(bug);
  });

  return app;
}
