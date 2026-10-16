import { useState } from "react";
import {
  Search,
  ArrowUpRight,
  X,
  LayoutTemplate,
  Monitor,
  Smartphone,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "../../components/copymail/SiteLayout";
import { TemplateCard, EmailView } from "../../components/copymail/EmailView";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import {
  templates,
  categories,
  filterTemplates,
  type EmailDocument,
} from "../../data/templates";

export default function Templates() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All templates");
  const [preview, setPreview] = useState<EmailDocument | null>(null);
  const [mobile, setMobile] = useState(false);
  const docs = filterTemplates(query, category);
  const project =
    typeof window === "undefined"
      ? ""
      : new URLSearchParams(window.location.search).get("project") || "";
  function href(id: string) {
    return `/studio/new?template=${id}${project ? `&project=${encodeURIComponent(project)}` : ""}`;
  }
  return (
    <div className="marketing-page">
      <SiteHeader active="Templates" />
      <main className="gallery-page wrap">
        <div className="gallery-hero">
          <span className="eyebrow">
            <span />
            Find your next great email
          </span>
          <h1>
            A little inspiration.
            <br />
            <span>Endless possibility.</span>
          </h1>
          <p>
            Good design, ready to become your own.
            <br />
            Explore our curated template selection and start creating.
          </p>
          <span className="catalog-note">
            <LayoutTemplate size={14} /> 12 editable examples · Preview of the
            Email Sketch library
          </span>
        </div>
        <div className="gallery-tools">
          <div className="search-input">
            <Search size={18} />
            <input
              aria-label="Search templates"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search templates, brands, or categories…"
            />
            {query && (
              <button aria-label="Clear search" onClick={() => setQuery("")}>
                <X size={16} />
              </button>
            )}
          </div>
          <span>
            {docs.length} template{docs.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="category-tabs gallery-tabs">
          {categories.map(cat => (
            <button
              className={category === cat ? "selected" : ""}
              key={cat}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {docs.length ? (
          <div className="template-grid gallery-grid">
            {docs.map(doc => (
              <TemplateCard
                key={doc.id}
                document={doc}
                href={href(doc.id)}
                onPreview={() => {
                  setPreview(doc);
                  setMobile(false);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={36} />
            <h2>No templates found.</h2>
            <p>Try a different search, or give another category a look.</p>
            <button
              className="button black"
              onClick={() => {
                setQuery("");
                setCategory("All templates");
              }}
            >
              Show all templates <ArrowUpRight size={17} />
            </button>
          </div>
        )}
        <div className="gallery-bottom">
          <h2>Found a little inspiration?</h2>
          <p>Turn a great starting point into your next great email.</p>
          <a className="button black" href="/projects">
            Create a project <ArrowUpRight size={17} />
          </a>
        </div>
      </main>
      <SiteFooter />
      <Dialog
        open={!!preview}
        onOpenChange={open => {
          if (!open) setPreview(null);
        }}
      >
        <DialogContent className="template-preview-dialog">
          <DialogHeader>
            <DialogTitle>{preview?.name}</DialogTitle>
            <DialogDescription>
              {preview?.category} · {preview?.brand} · Editable example template
            </DialogDescription>
          </DialogHeader>
          <div className="preview-dialog-tools">
            <div className="device-toggle">
              <button
                className={!mobile ? "active" : ""}
                onClick={() => setMobile(false)}
                aria-label="Desktop preview"
              >
                <Monitor size={16} />
              </button>
              <button
                className={mobile ? "active" : ""}
                onClick={() => setMobile(true)}
                aria-label="Mobile preview"
              >
                <Smartphone size={16} />
              </button>
            </div>
            {preview && (
              <a href={href(preview.id)} className="button black small">
                Use this template <ArrowUpRight size={15} />
              </a>
            )}
          </div>
          <div className="preview-scroll">
            <div className={`full-email-preview ${mobile ? "mobile" : ""}`}>
              {preview && <EmailView document={preview} />}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
