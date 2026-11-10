import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { Logo, EmailView } from "../components/copymail/EmailView";
import {
  BRAND_CREDIT,
  BRAND_CREDIT_URL,
  BRAND_LOCKUP,
  BRAND_LOGO_LIGHT,
  BRAND_NAME,
} from "./brand";
import { templates } from "../data/templates";
import { emailHtml, filename } from "./email";

describe("Emailmkt by Scout101", () => {
  it("renders the approved lockup and a linked Scout101 credit", () => {
    const html = renderToStaticMarkup(<Logo />);
    expect(BRAND_NAME).toBe("Emailmkt");
    expect(BRAND_CREDIT).toBe("by Scout101");
    expect(BRAND_LOCKUP).toBe("Emailmkt by Scout101");
    expect(BRAND_CREDIT_URL).toBe("https://scout101.net/");
    expect(html).toContain('aria-label="Emailmkt home"');
    expect(html).toContain(`href="${BRAND_CREDIT_URL}"`);
    expect(html).toContain(">by Scout101</a>");
    expect(html).toContain(BRAND_LOGO_LIGHT);
    expect(html).not.toContain("Adscraft");
    expect(html).not.toContain("Email Sketch");
    expect(html).not.toContain("CopyMail");
    const dark = renderToStaticMarkup(<Logo light />);
    expect(dark).toContain("/brand/logo-lockup-dark.svg");
    expect(dark).toContain(`href="${BRAND_CREDIT_URL}"`);
  });

  it("keeps the new name in both live previews and exported emails", () => {
    const preview = renderToStaticMarkup(<EmailView document={templates[0]} />);
    expect(preview).toContain("Made with Emailmkt ");
    expect(preview).toContain(">by Scout101</a>");
    expect(preview).toContain(`href="${BRAND_CREDIT_URL}"`);
    expect(preview).not.toContain("Adscraft");
    const exported = emailHtml(templates[0]);
    expect(exported).toContain("Made with Emailmkt ");
    expect(exported).toContain(
      `<a href="${BRAND_CREDIT_URL}" style="color:inherit;text-decoration:underline;">by Scout101</a>`
    );
    expect(exported).not.toContain("Adscraft");
    expect(exported.toLowerCase()).not.toContain("#ffd84d");
    expect(filename("!!!")).toBe("emailmkt-email");
  });

  it("credits Scout101 and retires the previous palette", () => {
    const css = readFileSync("client/src/index.css", "utf8").toLowerCase();
    const layout = readFileSync(
      "client/src/components/copymail/SiteLayout.tsx",
      "utf8"
    );
    expect(css).toContain("poppins");
    expect(css).toContain("noto sans thai");
    expect(css).toContain("#7646d6");
    expect(css).toContain("#ffb800");
    expect(css).toContain("#fff8e6");
    expect(css).toContain("#ffd465");
    expect(css).toContain("#111633");
    expect(css).toContain("#170528");
    expect(css).not.toContain("#ffd84d");
    expect(css).not.toContain("manrope");
    expect(layout).toContain("© 2026 Scout101");
    expect(layout).not.toContain("Adscraft");
    expect(layout).not.toContain("Get Found. Get Customers. Grow Better.");
    expect(layout).toContain("Emailmkt");
    expect(layout).not.toContain("Email Sketch");
    expect(layout).not.toContain("ADSCRAFT");
    expect(layout).toContain("https://scout101.net/");
    const page = readFileSync("client/index.html", "utf8");
    const manifest = readFileSync("client/public/site.webmanifest", "utf8");
    expect(page).toContain("Emailmkt by Scout101");
    expect(page).toContain("/og-image.png?v=3");
    expect(page).toContain("/favicon.svg?v=2");
    expect(page).not.toContain("Adscraft");
    expect(manifest).toContain('"name": "Emailmkt by Scout101"');
    expect(manifest).toContain('"short_name": "Emailmkt"');
    expect(manifest).not.toContain("Adscraft");
    expect(layout).toContain("https://rank-path.com");
    expect(layout).not.toContain("rankpath.io");
    expect(layout).not.toContain("Webriy");
    expect(layout).not.toContain("CopyElement");
    expect(layout).not.toContain("BrandKity");
    expect(layout).not.toContain("SEO45");
  });

  it.each([
    ["#808080", "#170528"],
    ["#ff0000", "#170528"],
    ["#FFB800", "#170528"],
    ["#7646D6", "#ffffff"],
    ["#000000", "#ffffff"],
    ["#ffffff", "#170528"],
  ])("uses readable button text for %s in preview and export", (accent, text) => {
    const document = { ...templates[0], accent };
    const preview = renderToStaticMarkup(<EmailView document={document} />);
    expect(preview).toContain(`background:${accent};color:${text}`);
    expect(emailHtml(document)).toContain(`bgcolor="${accent}"`);
    expect(emailHtml(document)).toContain(`color:${text};text-decoration:none`);
  });

  it("preserves the storage namespace used by existing projects and drafts", () => {
    const source = readFileSync("client/src/lib/workspace.tsx", "utf8");
    expect(source).toContain('const STORAGE_KEY = "copymail-workspace-v1"');
    expect(source).not.toContain('const STORAGE_KEY = "email-sketch-workspace');
  });
});
