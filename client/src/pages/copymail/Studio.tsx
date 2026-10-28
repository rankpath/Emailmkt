import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  Download,
  GripVertical,
  Image,
  Layers,
  Link2,
  Monitor,
  MousePointer2,
  Palette,
  Plus,
  Smartphone,
  Trash2,
  Type,
  Minus,
  Save,
  Undo2,
} from "lucide-react";
import { Logo, EmailView } from "../../components/copymail/EmailView";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { useWorkspace } from "../../lib/workspace";
import {
  templates,
  freshDocument,
  type EmailDocument,
  type EmailBlock,
  type BlockType,
} from "../../data/templates";
import {
  emailHtml,
  encodePreview,
  downloadText,
  filename,
} from "../../lib/email";
import { toast } from "sonner";

const blockIcons = {
  heading: Type,
  text: Type,
  image: Image,
  button: MousePointer2,
  divider: Minus,
};
export default function Studio({ params }: { params: { id: string } }) {
  const { data, saveDocument } = useWorkspace();
  const [, navigate] = useLocation();
  const query = new URLSearchParams(
    typeof window === "undefined" ? "" : window.location.search
  );
  const source =
    templates.find(t => t.id === query.get("template")) || templates[0];
  const existing = data.documents.find(d => d.id === params.id);
  const [doc, setDoc] = useState<EmailDocument>(() =>
    existing
      ? structuredClone(existing)
      : freshDocument(source, query.get("project") || undefined)
  );
  const [tab, setTab] = useState("content");
  const [selected, setSelected] = useState<string | undefined>(
    doc.blocks[0]?.id
  );
  const [mobile, setMobile] = useState(false);
  const [dirty, setDirty] = useState(!existing);
  const [share, setShare] = useState(false);
  const [exports, setExports] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [history, setHistory] = useState<EmailDocument[]>([]);
  const [dragged, setDragged] = useState<string | null>(null);
  const [panel, setPanel] = useState(true);
  const shareInput = useRef<HTMLInputElement>(null);
  const block = doc.blocks.find(b => b.id === selected);
  const back = doc.projectId
    ? `/projects/${doc.projectId}`
    : existing
      ? "/projects"
      : "/templates";
  const missing = params.id !== "new" && !existing && params.id !== doc.id;

  useEffect(() => {
    document.title = `${doc.name} — Email Sketch by Adscraft Digital`;
    const guard = (event: BeforeUnloadEvent) => {
      if (dirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty, doc.name]);

  function update(next: EmailDocument) {
    setHistory(h => [...h.slice(-19), structuredClone(doc)]);
    setDoc(next);
    setDirty(true);
  }
  function changeBlock(updates: Partial<EmailBlock>) {
    update({
      ...doc,
      blocks: doc.blocks.map(b =>
        b.id === selected ? { ...b, ...updates } : b
      ),
    });
  }
  function move(id: string, offset: number) {
    const from = doc.blocks.findIndex(b => b.id === id);
    const to = from + offset;
    if (to < 0 || to >= doc.blocks.length) return;
    const next = [...doc.blocks];
    [next[from], next[to]] = [next[to], next[from]];
    update({ ...doc, blocks: next });
  }
  function add(type: BlockType) {
    if (doc.blocks.length >= 30) {
      toast.error("Keep it focused: this editor supports up to 30 blocks.");
      return;
    }
    const defaults = {
      heading: "Something worth opening.",
      text: "A little something you want to share with your audience.",
      image: "",
      button: "Explore more",
      divider: "",
    };
    const added: EmailBlock = {
      id: crypto.randomUUID(),
      type,
      content: defaults[type],
      ...(type === "button" ? { url: "https://example.com" } : {}),
    };
    update({ ...doc, blocks: [...doc.blocks, added] });
    setSelected(added.id);
    setTab("content");
  }
  function save() {
    try {
      saveDocument(doc);
      setDirty(false);
      navigate(`/studio/${doc.id}`, { replace: true });
      toast.success("Your email is saved in this browser.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }
  function exportFile(format: "html" | "json") {
    downloadText(
      `${filename(doc.name)}.${format}`,
      format === "html"
        ? emailHtml(doc, window.location.origin)
        : JSON.stringify(doc, null, 2),
      format === "html" ? "text/html" : "application/json"
    );
    toast.success(`${format.toUpperCase()} exported. Your email, ready to go.`);
    setExports(false);
  }
  function openShare() {
    const encoded = encodePreview(doc);
    if (encoded.length > 60000) {
      toast.error(
        "This email is too large for a preview link. Export HTML instead."
      );
      return;
    }
    setShareUrl(`${window.location.origin}/preview#email=${encoded}`);
    setShare(true);
  }
  async function copyShare() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Preview link copied.");
    } catch {
      shareInput.current?.select();
      toast.info("Select and copy the preview link below.");
    }
  }
  function drop(target: string) {
    if (!dragged || dragged === target) return;
    const next = [...doc.blocks];
    const from = next.findIndex(b => b.id === dragged);
    const to = next.findIndex(b => b.id === target);
    if (from < 0 || to < 0) return;
    next.splice(to, 0, next.splice(from, 1)[0]);
    update({ ...doc, blocks: next });
    setDragged(null);
  }
  if (missing)
    return (
      <div className="empty-state">
        <Layers size={38} />
        <h1>Template not found.</h1>
        <p>
          Saved templates are available only in the browser where you created
          them.
        </p>
        <a href="/projects" className="button black">
          Back to projects <ArrowUpRight size={17} />
        </a>
      </div>
    );

  return (
    <div className="studio-app">
      <header className="studio-header">
        <div className="studio-header-left">
          <a
            href={back}
            className="icon-button"
            aria-label="Leave Studio"
            onClick={event => {
              if (
                dirty &&
                !window.confirm(
                  "You have unsaved changes. Leave Studio without saving?"
                )
              )
                event.preventDefault();
            }}
          >
            <ArrowLeft size={20} />
          </a>
          <Logo />
          <span className="studio-divider" />
          <div className="studio-title">
            <strong>{doc.name}</strong>
            <span>{dirty ? "Unsaved changes" : "Saved in this browser"}</span>
          </div>
        </div>
        <div className="studio-header-actions">
          <button
            className="icon-button undo-button"
            disabled={!history.length}
            aria-label="Undo last edit"
            onClick={() => {
              const previous = history.at(-1);
              if (previous) {
                setDoc(previous);
                setHistory(h => h.slice(0, -1));
                setDirty(true);
              }
            }}
          >
            <Undo2 size={18} />
          </button>
          <button
            className="button outline small share-button"
            onClick={openShare}
          >
            <Link2 size={15} />
            <span>Share preview</span>
          </button>
          <button className="button outline small" onClick={save}>
            <Save size={15} />
            <span>Save</span>
          </button>
          <button
            className="button accent small"
            onClick={() => setExports(true)}
          >
            <Download size={15} />
            <span>Export</span>
          </button>
        </div>
      </header>
      <div className="studio-body">
        <aside className={`studio-panel ${panel ? "visible" : ""}`}>
          <div className="studio-panel-tabs">
            <button
              className={tab === "content" ? "active" : ""}
              onClick={() => setTab("content")}
            >
              <Layers size={15} />
              Content
            </button>
            <button
              className={tab === "brand" ? "active" : ""}
              onClick={() => setTab("brand")}
            >
              <Palette size={15} />
              Brand
            </button>
          </div>
          <div className="studio-panel-scroll">
            {tab === "brand" ? (
              <div className="brand-controls cm-form">
                <h2>Make it unmistakably yours.</h2>
                <p>A few little details. A whole lot of personality.</p>
                <label>
                  Template name
                  <input
                    value={doc.name}
                    maxLength={80}
                    onChange={event =>
                      update({ ...doc, name: event.target.value })
                    }
                  />
                </label>
                <label>
                  Brand name
                  <input
                    value={doc.brand}
                    maxLength={50}
                    onChange={event =>
                      update({ ...doc, brand: event.target.value })
                    }
                  />
                </label>
                {[
                  ["accent", "Button color"],
                  ["background", "Email background"],
                  ["color", "Text color"],
                ].map(([key, label]) => (
                  <label key={key}>
                    {label}
                    <div className="color-input">
                      <input
                        type="color"
                        aria-label={label}
                        value={doc[key as "accent"]}
                        onChange={event =>
                          update({ ...doc, [key]: event.target.value })
                        }
                      />
                      <span>{doc[key as "accent"].toUpperCase()}</span>
                    </div>
                  </label>
                ))}
                <label>
                  Typography style
                  <select
                    value={doc.style}
                    onChange={event =>
                      update({
                        ...doc,
                        style: event.target.value as EmailDocument["style"],
                      })
                    }
                  >
                    <option value="editorial">Editorial serif</option>
                    <option value="bold">Bold & expressive</option>
                    <option value="minimal">Modern minimal</option>
                    <option value="travel">Travel journal</option>
                  </select>
                </label>
                <div className="studio-panel-note">
                  <Check size={15} />
                  <p>
                    Your edits update the preview instantly. Save to keep them
                    in this browser.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="panel-section-heading">
                  <h2>Your email, block by block.</h2>
                  <p>Drag to reorder. Click to make it yours.</p>
                </div>
                <div className="block-list">
                  {doc.blocks.map((b, i) => {
                    const Icon = blockIcons[b.type];
                    return (
                      <div
                        key={b.id}
                        className={`block-row ${selected === b.id ? "selected" : ""}`}
                        draggable
                        onDragStart={() => setDragged(b.id)}
                        onDragEnd={() => setDragged(null)}
                        onDragOver={event => event.preventDefault()}
                        onDrop={event => {
                          event.preventDefault();
                          drop(b.id);
                        }}
                      >
                        <GripVertical size={13} className="block-grip" />
                        <button
                          className="block-select"
                          onClick={() => setSelected(b.id)}
                        >
                          <Icon size={15} />
                          <span>
                            {b.type === "divider"
                              ? "Divider"
                              : b.content
                                ? b.content.slice(0, 23)
                                : "Image"}
                          </span>
                        </button>
                        <div className="block-move">
                          <button
                            aria-label={`Move block ${i + 1} up`}
                            disabled={i === 0}
                            onClick={() => move(b.id, -1)}
                          >
                            <ChevronUp size={12} />
                          </button>
                          <button
                            aria-label={`Move block ${i + 1} down`}
                            disabled={i === doc.blocks.length - 1}
                            onClick={() => move(b.id, 1)}
                          >
                            <ChevronDown size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="add-blocks">
                  <span>Add a little something</span>
                  <div>
                    {(
                      [
                        "heading",
                        "text",
                        "image",
                        "button",
                        "divider",
                      ] as BlockType[]
                    ).map(type => {
                      const Icon = blockIcons[type];
                      return (
                        <button key={type} onClick={() => add(type)}>
                          <Icon size={16} />
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {block && (
                  <div className="block-edit cm-form">
                    <div className="block-edit-heading">
                      <h3>Edit {block.type}</h3>
                      <button
                        className="icon-button"
                        aria-label="Remove selected block"
                        onClick={() => {
                          update({
                            ...doc,
                            blocks: doc.blocks.filter(b => b.id !== selected),
                          });
                          setSelected(
                            doc.blocks.find(b => b.id !== selected)?.id
                          );
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    {block.type !== "divider" && (
                      <label>
                        {block.type === "image"
                          ? "Image URL (HTTPS)"
                          : "Your content"}
                        {block.type === "image" ? (
                          <input
                            value={block.content}
                            maxLength={2048}
                            placeholder="https://…"
                            onChange={event =>
                              changeBlock({ content: event.target.value })
                            }
                          />
                        ) : (
                          <textarea
                            value={block.content}
                            maxLength={4000}
                            onChange={event =>
                              changeBlock({ content: event.target.value })
                            }
                          />
                        )}
                      </label>
                    )}
                    {block.type === "button" && (
                      <label>
                        Destination URL
                        <input
                          value={block.url || ""}
                          maxLength={2048}
                          type="url"
                          placeholder="https://your-website.com"
                          onChange={event =>
                            changeBlock({ url: event.target.value })
                          }
                        />
                        <small>
                          Replace example.com with your real destination before
                          sending.
                        </small>
                      </label>
                    )}
                    {block.type === "image" && (
                      <label>
                        Image description
                        <input
                          value={block.url || ""}
                          maxLength={200}
                          onChange={event =>
                            changeBlock({ url: event.target.value })
                          }
                          placeholder="Describe this image"
                        />
                      </label>
                    )}
                    {block.type === "divider" && (
                      <p>A little breathing room between your ideas.</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="studio-panel-bottom">
            <span className="status-dot" />
            Browser-local workspace · Free
          </div>
        </aside>
        <main className="studio-canvas">
          <div className="canvas-toolbar">
            <button
              className="studio-panel-toggle button outline small"
              onClick={() => setPanel(!panel)}
            >
              <Layers size={14} />
              {panel ? "Hide controls" : "Edit template"}
            </button>
            <span className="canvas-label">LIVE PREVIEW</span>
            <div className="device-toggle">
              <button
                aria-label="Desktop preview"
                className={!mobile ? "active" : ""}
                onClick={() => setMobile(false)}
              >
                <Monitor size={17} />
                <span>Desktop</span>
              </button>
              <button
                aria-label="Mobile preview"
                className={mobile ? "active" : ""}
                onClick={() => setMobile(true)}
              >
                <Smartphone size={17} />
                <span>Mobile</span>
              </button>
            </div>
            <span className="canvas-width">{mobile ? "375" : "600"} px</span>
          </div>
          <div className="studio-canvas-scroll">
            <div
              className={`full-email-preview studio-email ${mobile ? "mobile" : ""}`}
            >
              <EmailView document={doc} />
            </div>
            <p className="canvas-footnote">
              A preview of your email. Test in your ESP before sending.
            </p>
          </div>
        </main>
      </div>
      <Dialog open={exports} onOpenChange={setExports}>
        <DialogContent className="cm-dialog">
          <DialogHeader>
            <span className="dialog-symbol">
              <Download size={23} />
            </span>
            <DialogTitle>Good to go.</DialogTitle>
            <DialogDescription>
              Take your email wherever your audience is.
            </DialogDescription>
          </DialogHeader>
          <div className="export-options">
            <button onClick={() => exportFile("html")}>
              <Code2 size={24} />
              <div>
                <strong>Export HTML</strong>
                <span>Responsive, table-based code for your ESP</span>
              </div>
              <ArrowUpRight size={19} />
            </button>
            <button onClick={() => exportFile("json")}>
              <Layers size={24} />
              <div>
                <strong>Export JSON</strong>
                <span>A portable backup of your design and content</span>
              </div>
              <ArrowUpRight size={19} />
            </button>
          </div>
          <p className="form-note">
            Before sending: add your business address, your ESP’s unsubscribe
            link, and your real button URLs. Test the final email in your target
            inboxes.
          </p>
        </DialogContent>
      </Dialog>
      <Dialog open={share} onOpenChange={setShare}>
        <DialogContent className="cm-dialog">
          <DialogHeader>
            <span className="dialog-symbol">
              <Link2 size={23} />
            </span>
            <DialogTitle>A little feedback goes a long way.</DialogTitle>
            <DialogDescription>
              Share a read-only preview of this version of your email.
            </DialogDescription>
          </DialogHeader>
          <label className="share-label">
            Preview link
            <input
              ref={shareInput}
              readOnly
              value={shareUrl}
              onFocus={event => event.target.select()}
            />
          </label>
          <button className="button black" onClick={copyShare}>
            <Copy size={16} />
            Copy preview link
          </button>
          <a
            className="text-link"
            href={shareUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open preview <ArrowUpRight size={17} />
          </a>
          <p className="form-note">
            Anyone with this link can see the email content encoded inside it.
            Don’t include private or sensitive information. Later edits won’t
            change this shared version.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
