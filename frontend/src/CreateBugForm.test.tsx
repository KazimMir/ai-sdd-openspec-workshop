import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateBugForm } from "./CreateBugForm.tsx";

describe("CreateBugForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows the server validation error and preserves input on failure", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ error: { field: "title", message: "Title is required" } }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const user = userEvent.setup();
    render(<CreateBugForm onCreated={vi.fn()} />);

    const title = screen.getByLabelText(/title/i);
    await user.type(title, "   ");
    await user.click(screen.getByRole("button", { name: /create bug/i }));

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument();
    expect(title).toHaveValue("   ");
  });

  it("creates the bug and clears the form on success", async () => {
    const created = {
      id: "1",
      title: "Login fails",
      status: "New",
      createdAt: new Date(0).toISOString(),
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => created,
    });
    vi.stubGlobal("fetch", fetchMock);

    const onCreated = vi.fn();
    const user = userEvent.setup();
    render(<CreateBugForm onCreated={onCreated} />);

    const title = screen.getByLabelText(/title/i);
    await user.type(title, "Login fails");
    await user.click(screen.getByRole("button", { name: /create bug/i }));

    await waitFor(() => expect(onCreated).toHaveBeenCalledWith(created));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/bugs",
      expect.objectContaining({ method: "POST" })
    );
    expect(title).toHaveValue("");
  });
});
