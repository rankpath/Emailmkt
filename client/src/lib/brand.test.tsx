import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { Logo, EmailView } from "../components/copymail/EmailView";
import { BRAND_NAME, BRAND_LOGO_URL } from "./brand";
import { templates } from "../data/templates";
import { emailHtml, filename } from "./email";

describe("Email Sketch rebrand", () => {
  it("renders the new accessible wordmark and logo asset", () => {
    const html = renderToStaticMarkup(<Logo />);
    expect(BRAND_NAME).toBe("Email Sketch");
    expect(html).toContain('aria-label="Email Sketch home"');
    expect(html).toContain(BRAND_LOGO_URL);
    expect(html).toContain("brand-sketch");
    expect(html).not.toContain("CopyMail");
  });

  it("keeps the new name in both live previews and exported emails", () => {
    expect(
      renderToStaticMarkup(<EmailView document={templates[0]} />)
    ).toContain("Made with Email Sketch");
    expect(emailHtml(templates[0])).toContain("Made with Email Sketch");
    expect(filename("!!!")).toBe("email-sketch-email");
  });

  it("preserves the storage namespace used by existing projects and drafts", () => {
    const source = readFileSync("client/src/lib/workspace.tsx", "utf8");
    expect(source).toContain('const STORAGE_KEY = "copymail-workspace-v1"');
    expect(source).not.toContain('const STORAGE_KEY = "email-sketch-workspace');
  });
});
