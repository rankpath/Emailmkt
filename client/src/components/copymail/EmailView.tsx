import type { EmailDocument } from "../../data/templates";
import { accentTextColor, safeUrl } from "../../lib/email";
import {
  BRAND_CREDIT,
  BRAND_CREDIT_URL,
  BRAND_ICON,
  BRAND_NAME,
  BRAND_LOGO_DARK,
  BRAND_LOGO_LIGHT,
} from "../../lib/brand";
import { ArrowUpRight, Check } from "lucide-react";

export function BrandCreditLink({
  children = BRAND_CREDIT,
  className = "brand-inline",
}: {
  children?: string;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={BRAND_CREDIT_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`wordmark ${light ? "light" : ""}`}>
      <a href="/" className="logo-home" aria-label={`${BRAND_NAME} home`}>
        <img
          className="logo-lockup"
          src={light ? BRAND_LOGO_DARK : BRAND_LOGO_LIGHT}
          alt=""
        />
        <img className="logo-icon-only" src={BRAND_ICON} alt="" />
      </a>
      <BrandCreditLink className="brand-credit">{BRAND_CREDIT}</BrandCreditLink>
    </span>
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
                color: accentTextColor(doc.accent),
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
        Made with {BRAND_NAME} <BrandCreditLink />
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
