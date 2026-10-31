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
    expect(html).toContain(
      'aria-label="Email Sketch by Adscraft Digital home"'
    );
    expect(html).toContain("by Adscraft Digital");
    expect(html).toContain(BRAND_LOGO_URL);
    expect(html).toContain("brand-sketch");
    expect(html).not.toContain("CopyMail");
  });

  it("keeps the new name in both live previews and exported emails", () => {
    expect(
      renderToStaticMarkup(<EmailView document={templates[0]} />)
    ).toContain("Made with Email Sketch");
    expect(emailHtml(templates[0])).toContain(
      "Made with Email Sketch by Adscraft Digital"
    );
    expect(emailHtml(templates[0]).toLowerCase()).not.toContain("#ffd84d");
    expect(filename("!!!")).toBe("email-sketch-email");
  });

  it("endorses Adscraft Digital and retires the previous palette", () => {
    const css = readFileSync("client/src/index.css", "utf8").toLowerCase();
    const layout = readFileSync(
      "client/src/components/copymail/SiteLayout.tsx",
      "utf8"
    );
    expect(css).toContain("poppins");
    expect(css).toContain("noto sans thai");
    expect(css).toContain("#7646d6");
    expect(css).toContain("#111633");
    expect(css).toContain("#170528");
    expect(css).toContain("#f4f1fa");
    expect(css).not.toContain("#ffd84d");
    expect(css).not.toContain("manrope");
    expect(layout).toContain("© 2026 Adscraft Digital");
    expect(layout).toContain("Get Found. Get Customers. Grow Better.");
    expect(layout).toContain("https://scout101.net/");
    expect(layout).toContain("https://rank-path.com");
    expect(layout).not.toContain("rankpath.io");
    expect(layout).not.toContain("Webriy");
    expect(layout).not.toContain("CopyElement");
    expect(layout).not.toContain("BrandKity");
    expect(layout).not.toContain("SEO45");
  });

  it("preserves the storage namespace used by existing projects and drafts", () => {
    const source = readFileSync("client/src/lib/workspace.tsx", "utf8");
    expect(source).toContain('const STORAGE_KEY = "copymail-workspace-v1"');
    expect(source).not.toContain('const STORAGE_KEY = "email-sketch-workspace');
  });
});
