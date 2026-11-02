import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { Logo, EmailView } from "../components/copymail/EmailView";
import { BRAND_LOCKUP, BRAND_LOGO_LIGHT, BRAND_NAME } from "./brand";
import { templates } from "../data/templates";
import { emailHtml, filename } from "./email";

describe("Emailmkt by Adscraft", () => {
  it("renders the approved lockup and accessible name", () => {
    const html = renderToStaticMarkup(<Logo />);
    expect(BRAND_NAME).toBe("Emailmkt");
    expect(BRAND_LOCKUP).toBe("Emailmkt by Adscraft");
    expect(html).toContain('aria-label="Emailmkt by Adscraft home"');
    expect(html).toContain(BRAND_LOGO_LIGHT);
    expect(html).not.toContain("Email Sketch");
    expect(html).not.toContain("CopyMail");
    const dark = renderToStaticMarkup(<Logo light />);
    expect(dark).toContain("/brand/logo-lockup-dark.svg");
  });

  it("keeps the new name in both live previews and exported emails", () => {
    expect(
      renderToStaticMarkup(<EmailView document={templates[0]} />)
    ).toContain("Made with Emailmkt by Adscraft");
    expect(emailHtml(templates[0])).toContain("Made with Emailmkt by Adscraft");
    expect(emailHtml(templates[0]).toLowerCase()).not.toContain("#ffd84d");
    expect(filename("!!!")).toBe("emailmkt-email");
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
    expect(layout).toContain("Emailmkt");
    expect(layout).not.toContain("Email Sketch");
    expect(layout).not.toContain("ADSCRAFT");
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
