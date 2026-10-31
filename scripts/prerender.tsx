import { readFile, writeFile, mkdir } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import Home from "../client/src/pages/Home";
import Templates from "../client/src/pages/copymail/Templates";

const shell = await readFile("dist/public/index.html", "utf8");
const pages = [
  {
    path: "",
    element: <Home />,
    title: "Email Sketch by Adscraft Digital — Email Templates, Made Yours",
    description:
      "Email Sketch by Adscraft Digital. Great emails start here. Explore professional email templates, customize your design in Email Sketch Studio, and export HTML to your favorite email platform.",
  },
  {
    path: "templates",
    element: <Templates />,
    title: "Email Template Library — Email Sketch by Adscraft Digital",
    description:
      "Find your next great email. Browse editable newsletter, e-commerce, promotional and onboarding examples, preview each design, and make it yours in Studio.",
  },
];
for (const page of pages) {
  let html = shell
    .replace(
      '<div id="root"></div>',
      `<div id="root">${renderToString(page.element)}</div>`
    )
    .replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/g, "");
  for (const [attribute, key, value] of [
    ["name", "description", page.description],
    ["property", "og:title", page.title],
    ["property", "og:description", page.description],
    ["name", "twitter:title", page.title],
    ["name", "twitter:description", page.description],
  ]) {
    html = html.replace(
      new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?>`),
      `<meta ${attribute}="${key}" content="${value}" />`
    );
  }
  const dir = `dist/public${page.path ? `/${page.path}` : ""}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, html);
  console.log(`Prerendered /${page.path}: ${html.length} bytes`);
}
// SPA fallbacks must not serve an indexable home document at browser-local routes.
await writeFile("dist/public/workspace-shell.html", shell);
for (const path of ["projects", "projects/new", "preview"]) {
  await mkdir(`dist/public/${path}`, { recursive: true });
  await writeFile(`dist/public/${path}/index.html`, shell);
}
