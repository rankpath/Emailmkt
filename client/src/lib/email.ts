import type { EmailDocument, EmailBlock } from "../data/templates";

export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    char =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!
  );
}
export function safeUrl(value: string, origin = ""): string {
  if (value.startsWith("/manus-storage/") && origin) return `${origin}${value}`;
  if (/^https?:\/\//i.test(value)) {
    try {
      return new URL(value).href;
    } catch {
      return "";
    }
  }
  if (/^mailto:[^\s<>]+$/i.test(value)) return value;
  return "";
}
function safeColor(color: string) {
  return /^#[a-f0-9]{6}$/i.test(color) ? color : "#171717";
}
export function emailHtml(doc: EmailDocument, origin = ""): string {
  const accent = safeColor(doc.accent);
  const background = safeColor(doc.background);
  const color = safeColor(doc.color);
  function renderBlock(block: EmailBlock) {
    const content = escapeHtml(block.content).replace(/\n/g, "<br>");
    if (block.type === "heading")
      return `<tr><td style="padding:26px 40px 24px;color:${color};font-family:Arial,sans-serif;font-size:42px;line-height:1.1;font-weight:bold;text-align:center;">${content}</td></tr>`;
    if (block.type === "text")
      return `<tr><td style="padding:16px 40px;color:${color};font-family:Arial,sans-serif;font-size:16px;line-height:1.65;text-align:center;">${content}</td></tr>`;
    if (block.type === "image") {
      const src = safeUrl(block.content, origin);
      return src
        ? `<tr><td style="padding:0 24px;"><img src="${escapeHtml(src)}" alt="${escapeHtml(block.url || "Email image")}" width="552" style="display:block;width:100%;height:auto;border:0;"></td></tr>`
        : "";
    }
    if (block.type === "button")
      return `<tr><td align="center" style="padding:18px 30px 28px;"><table role="presentation" cellspacing="0" cellpadding="0"><tr><td bgcolor="${accent}" style="border-radius:4px;text-align:center;"><a href="${escapeHtml(safeUrl(block.url || "") || "#")}" style="display:inline-block;padding:16px 28px;color:${accent === "#ffd84d" ? "#171717" : "#ffffff"};text-decoration:none;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;">${content}</a></td></tr></table></td></tr>`;
    return `<tr><td style="padding:16px 40px;"><hr style="border:0;border-top:1px solid ${color};opacity:0.15;"></td></tr>`;
  }
  return `<!DOCTYPE html>\n<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(doc.name)}</title></head><body style="margin:0;padding:28px 12px;background:#efefed;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center"><table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:${background};"><tr><td style="padding:30px 30px 12px;text-align:center;color:${color};font-family:Arial,sans-serif;font-weight:bold;font-size:20px;letter-spacing:3px;">${escapeHtml(doc.brand)}</td></tr>${doc.blocks.map(renderBlock).join("")}<tr><td style="padding:20px 40px 35px;font-family:Arial,sans-serif;font-size:11px;text-align:center;color:${color};">${escapeHtml(doc.brand)} · Made with Email Sketch<br><br>Replace this footer with your business address and your ESP’s unsubscribe link before sending.</td></tr></table></td></tr></table></body></html>`;
}
export function downloadText(
  filename: string,
  text: string,
  mime = "text/plain"
) {
  const url = URL.createObjectURL(new Blob([text], { type: mime }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function filename(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "email-sketch-email"
  );
}
export function encodePreview(doc: EmailDocument): string {
  const publicDoc = { ...doc, projectId: undefined };
  const bytes = new TextEncoder().encode(JSON.stringify(publicDoc));
  let binary = "";
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
export function decodePreview(encoded: string): EmailDocument | null {
  try {
    if (!encoded || encoded.length > 100000) return null;
    const binary = atob(encoded.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    const value = JSON.parse(new TextDecoder().decode(bytes));
    if (
      typeof value.name !== "string" ||
      typeof value.brand !== "string" ||
      !Array.isArray(value.blocks) ||
      value.blocks.length > 50
    )
      return null;
    if (
      ![value.accent, value.background, value.color].every(
        c => typeof c === "string" && /^#[a-f0-9]{6}$/i.test(c)
      )
    )
      return null;
    if (!["editorial", "bold", "minimal", "travel"].includes(value.style))
      return null;
    if (
      !value.blocks.every(
        (b: EmailBlock) =>
          typeof b.id === "string" &&
          typeof b.content === "string" &&
          ["heading", "text", "button", "image", "divider"].includes(b.type) &&
          (b.url === undefined || typeof b.url === "string")
      )
    )
      return null;
    return value as EmailDocument;
  } catch {
    return null;
  }
}
