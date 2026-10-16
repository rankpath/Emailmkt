import { describe, it, expect } from "vitest";
import { templates, filterTemplates } from "../data/templates";
import { projectError, documentError, type WorkspaceData } from "./workspace";
import {
  emailHtml,
  encodePreview,
  decodePreview,
  safeUrl,
  filename,
} from "./email";

describe("Template catalog", () => {
  it("contains 12 unique working examples", () => {
    expect(templates).toHaveLength(12);
    expect(new Set(templates.map(t => t.id)).size).toBe(12);
  });
  it("combines search and category filtering", () => {
    expect(filterTemplates("botanica", "E-commerce").map(t => t.id)).toEqual([
      "daily-ritual",
    ]);
    expect(filterTemplates("   ORBIT  ", "All templates")).toHaveLength(2);
    expect(filterTemplates("not-a-template", "All templates")).toHaveLength(0);
    expect(filterTemplates("", "Newsletter")).toHaveLength(2);
  });
});

describe("Free workspace limits", () => {
  it("requires a nonblank name and limits to three projects", () => {
    expect(projectError("  ", 0)).toMatch(/name/);
    expect(projectError("Campaign", 3)).toMatch(/3 projects/);
    expect(projectError("Q3 Newsletter Campaign", 2)).toBeNull();
  });
  it("limits five templates per project while allowing updates", () => {
    const data: WorkspaceData = {
      projects: [{ id: "p", name: "Campaign", description: "", createdAt: "" }],
      documents: Array.from({ length: 5 }, (_, i) => ({
        ...templates[0],
        id: `d${i}`,
        projectId: "p",
      })),
    };
    expect(
      documentError(data, { ...templates[0], id: "new", projectId: "p" })
    ).toMatch(/5 templates/);
    expect(documentError(data, data.documents[0])).toBeNull();
    expect(
      documentError(data, { ...templates[0], id: "new", projectId: "missing" })
    ).toMatch(/no longer exists/);
  });
  it("limits fifteen total saved templates", () => {
    const data: WorkspaceData = {
      projects: [],
      documents: Array.from({ length: 15 }, (_, i) => ({
        ...templates[0],
        id: `d${i}`,
      })),
    };
    expect(documentError(data, { ...templates[0], id: "new" })).toMatch(
      /15 saved/
    );
  });
});

describe("Safe portable email output", () => {
  it("exports table-based responsive HTML with escaped user content", () => {
    const doc = {
      ...templates[0],
      brand: "<script>alert(1)</script>",
      blocks: [
        {
          id: "h",
          type: "heading" as const,
          content: "<img src=x onerror=alert(1)>",
        },
        {
          id: "b",
          type: "button" as const,
          content: "Click",
          url: "javascript:alert(1)",
        },
      ],
    };
    const html = emailHtml(doc, "https://example.org");
    expect(html).toContain('role="presentation"');
    expect(html).toContain("max-width:600px");
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("javascript:");
    expect(html).toContain("&lt;img");
  });
  it("uses absolute asset URLs in exports and rejects unsafe URL schemes", () => {
    expect(safeUrl("/manus-storage/test.webp", "https://preview.example")).toBe(
      "https://preview.example/manus-storage/test.webp"
    );
    expect(safeUrl("javascript:alert(1)")).toBe("");
    expect(safeUrl("data:text/html,bad")).toBe("");
    expect(safeUrl("https://example.com")).toBe("https://example.com/");
  });
  it("roundtrips Unicode email content without exposing project identifiers", () => {
    const doc = {
      ...templates[0],
      name: "Hello — สวัสดี",
      projectId: "private-project",
    };
    const decoded = decodePreview(encodePreview(doc));
    expect(decoded?.name).toBe(doc.name);
    expect(decoded?.projectId).toBeUndefined();
    expect(decoded?.blocks).toEqual(doc.blocks);
  });
  it("rejects malformed and invalid preview payloads", () => {
    expect(decodePreview("broken")).toBeNull();
    expect(decodePreview("A".repeat(100001))).toBeNull();
    expect(
      decodePreview(
        encodePreview({ ...templates[0], accent: "red;position:fixed" })
      )
    ).toBeNull();
  });
  it("makes safe filenames", () => {
    expect(filename("../../My Campaign!")).toBe("my-campaign");
  });
});
