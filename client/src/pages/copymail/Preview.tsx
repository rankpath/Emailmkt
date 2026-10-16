import { useState } from "react";
import { ArrowUpRight, Download, Monitor, Smartphone } from "lucide-react";
import { Logo, EmailView } from "../../components/copymail/EmailView";
import {
  decodePreview,
  downloadText,
  emailHtml,
  filename,
} from "../../lib/email";

export default function Preview() {
  const [mobile, setMobile] = useState(false);
  const encoded =
    typeof window === "undefined"
      ? ""
      : new URLSearchParams(window.location.hash.slice(1)).get("email") ||
        new URLSearchParams(window.location.search).get("email") ||
        "";
  const doc = decodePreview(encoded);
  return (
    <div className="shared-preview-page">
      <header>
        <Logo />
        <span>Shared email preview</span>
        <a className="button black small" href="/templates">
          Make one yours <ArrowUpRight size={15} />
        </a>
      </header>
      {doc ? (
        <>
          <div className="shared-preview-title">
            <h1>{doc.name}</h1>
            <p>Read-only preview · {doc.brand}</p>
            <div className="shared-preview-actions">
              <div className="device-toggle">
                <button
                  className={!mobile ? "active" : ""}
                  onClick={() => setMobile(false)}
                  aria-label="Desktop preview"
                >
                  <Monitor size={17} />
                </button>
                <button
                  className={mobile ? "active" : ""}
                  onClick={() => setMobile(true)}
                  aria-label="Mobile preview"
                >
                  <Smartphone size={17} />
                </button>
              </div>
              <button
                className="button outline small"
                onClick={() =>
                  downloadText(
                    `${filename(doc.name)}.html`,
                    emailHtml(doc, window.location.origin),
                    "text/html"
                  )
                }
              >
                <Download size={15} />
                Download HTML
              </button>
            </div>
          </div>
          <div
            className={`full-email-preview shared-email ${mobile ? "mobile" : ""}`}
          >
            <EmailView document={doc} />
          </div>
          <p className="canvas-footnote">
            This is a snapshot of the email at the time the link was created.
          </p>
        </>
      ) : (
        <div className="empty-state">
          <h1>This preview isn’t available.</h1>
          <p>
            The link may be incomplete or too large. Ask the creator for a fresh
            preview link.
          </p>
          <a className="button black" href="/templates">
            Explore templates <ArrowUpRight size={17} />
          </a>
        </div>
      )}
    </div>
  );
}
