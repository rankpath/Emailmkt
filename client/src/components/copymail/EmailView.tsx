import type { EmailDocument } from "../../data/templates";
import { safeUrl } from "../../lib/email";
import { BRAND_LOGO_URL, BRAND_NAME } from "../../lib/brand";
import { ArrowUpRight, Check } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="/"
      className={`wordmark ${light ? "light" : ""}`}
      aria-label={`${BRAND_NAME} home`}
    >
      <span className="logo-mark">
        <img src={BRAND_LOGO_URL} alt="" width={32} height={32} />
      </span>
      <span className="brand-name">
        Email <span className="brand-sketch">Sketch</span>
      </span>
    </a>
  );
}

export function EmailView({
  document: doc,
  compact = false,
}: {
  document: EmailDocument;
  compact?: boolean;
}) {
  return (
    <div
      className={`email-document email-${doc.style} ${compact ? "compact" : ""}`}
      style={
        {
          background: doc.background,
          color: doc.color,
          "--email-accent": doc.accent,
        } as React.CSSProperties
      }
    >
      <div className="email-brand">{doc.brand}</div>
      {doc.style === "minimal" && (
        <div className="email-minimal-art" aria-hidden="true">
          <span />
          <span />
          <span />
          <ArrowUpRight />
        </div>
      )}
      {doc.blocks.map(block => {
        if (block.type === "heading")
          return (
            <h2 key={block.id} className="email-heading">
              {block.content}
            </h2>
          );
        if (block.type === "text")
          return (
            <p key={block.id} className="email-text">
              {block.content}
            </p>
          );
        if (block.type === "image") {
          const src = block.content.startsWith("/manus-storage/")
            ? block.content
            : safeUrl(block.content);
          return src ? (
            <img
              key={block.id}
              className="email-image"
              src={src}
              alt={block.url || "Campaign image"}
              loading={compact ? "lazy" : "eager"}
            />
          ) : (
            <div key={block.id} className="email-image-empty">
              Add an HTTPS image URL
            </div>
          );
        }
        if (block.type === "button")
          return (
            <div
              className="email-cta"
              key={block.id}
              style={{
                background: doc.accent,
                color: doc.accent === "#ffd84d" ? "#171717" : "#ffffff",
              }}
            >
              {block.content}
              <ArrowUpRight size={compact ? 9 : 15} />
            </div>
          );
        return <div key={block.id} className="email-divider" />;
      })}
      <div className="email-footer">
        {doc.brand} · Thoughtfully delivered.
        <br />
        Made with Email Sketch
      </div>
    </div>
  );
}

export function TemplateCard({
  document: doc,
  href,
  onPreview,
}: {
  document: EmailDocument;
  href?: string;
  onPreview?: () => void;
}) {
  return (
    <article className="template-card">
      <div className={`template-thumbnail thumb-${doc.style}`}>
        <div className="template-paper">
          <EmailView document={doc} compact />
        </div>
        <span className="template-free">
          <Check size={11} /> Free
        </span>
        <div className="template-hover">
          {onPreview && (
            <button className="button white small" onClick={onPreview}>
              Preview template
            </button>
          )}
          <a
            className="button black small"
            href={href || `/studio/new?template=${doc.id}`}
          >
            Use template <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="template-caption">
        <div>
          <h3>{doc.name}</h3>
          <span>{doc.category}</span>
        </div>
        <a
          href={href || `/studio/new?template=${doc.id}`}
          aria-label={`Use ${doc.name}`}
          className="icon-button"
        >
          <ArrowUpRight size={18} />
        </a>
      </div>
      {onPreview && (
        <button className="template-touch-preview" onClick={onPreview}>
          Preview template <ArrowUpRight size={13} />
        </button>
      )}
    </article>
  );
}
