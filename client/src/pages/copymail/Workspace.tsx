import { useState } from "react";
import {
  FolderPlus,
  Plus,
  Search,
  ArrowUpRight,
  FolderOpen,
  Trash2,
  X,
} from "lucide-react";
import { WorkspaceShell } from "../../components/copymail/WorkspaceShell";
import { useWorkspace, type Project } from "../../lib/workspace";
import { TemplateCard } from "../../components/copymail/EmailView";
import type { EmailDocument } from "../../data/templates";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { toast } from "sonner";

export default function Workspace() {
  const { data, deleteProject, deleteDocument } = useWorkspace();
  const [query, setQuery] = useState("");
  const [remove, setRemove] = useState<Project | null>(null);
  const [removeDraft, setRemoveDraft] = useState<EmailDocument | null>(null);
  const drafts = data.documents.filter(
    doc =>
      !doc.projectId &&
      `${doc.name} ${doc.brand}`.toLowerCase().includes(query.toLowerCase())
  );
  const draftCount = data.documents.filter(doc => !doc.projectId).length;
  const projects = data.projects.filter(p =>
    `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <WorkspaceShell>
      <div className="workspace-title">
        <div>
          <span className="eyebrow">
            <span />A little space for big ideas
          </span>
          <h1>
            Your projects<span className="yellow-dot">.</span>
          </h1>
          <p>Your next great campaign starts with a project.</p>
        </div>
        <a href="/projects/new" className="button black">
          <Plus size={17} />
          New project
        </a>
      </div>
      <div className="workspace-toolbar">
        <div className="search-input">
          <Search size={17} />
          <input
            aria-label="Search projects"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Find a project…"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear project search"
            >
              <X size={15} />
            </button>
          )}
        </div>
        <span>{data.projects.length} of 3 projects</span>
      </div>
      {projects.length ? (
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.id}>
              <div className={`project-visual project-color-${index % 3}`}>
                <FolderOpen size={42} strokeWidth={1.4} />
                <span>
                  {
                    data.documents.filter(d => d.projectId === project.id)
                      .length
                  }{" "}
                  templates
                </span>
              </div>
              <div className="project-card-content">
                <a href={`/projects/${project.id}`}>
                  <h2>{project.name}</h2>
                  <ArrowUpRight size={18} />
                </a>
                <p>
                  {project.description ||
                    "A fresh space for your next great email."}
                </p>
                <div className="project-card-bottom">
                  <small>
                    Created{" "}
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </small>
                  <button
                    aria-label={`Delete ${project.name}`}
                    onClick={() => setRemove(project)}
                    className="icon-button"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state workspace-empty">
          <div className="empty-illustration">
            <FolderPlus size={62} strokeWidth={1.2} />
            <span>✳</span>
          </div>
          <h2>
            {query ? "No projects found." : "Big ideas need a little space."}
          </h2>
          <p>
            {query
              ? "Try another name or clear your search."
              : "Create your first project to organize your templates,\nfind your flow, and make something great."}
          </p>
          {query ? (
            <button className="button black" onClick={() => setQuery("")}>
              Clear search
            </button>
          ) : (
            <a className="button black" href="/projects/new">
              <Plus size={17} />
              Create your first project
            </a>
          )}
          <a className="text-link" href="/templates">
            Just browsing? Explore templates <ArrowUpRight size={16} />
          </a>
        </div>
      )}
      {draftCount > 0 && (
        <section className="saved-drafts-section">
          <div className="saved-drafts-heading">
            <div>
              <h2>
                Your saved drafts<span className="yellow-dot">.</span>
              </h2>
              <p>
                Great ideas don’t always start with a project. Pick up where you
                left off.
              </p>
            </div>
            <span>
              {draftCount} drafts · {data.documents.length} / 15 total templates
            </span>
          </div>
          {drafts.length > 0 ? (
            <div className="template-grid project-template-grid">
              {drafts.map(doc => (
                <div key={doc.id}>
                  <TemplateCard document={doc} href={`/studio/${doc.id}`} />
                  <div className="saved-template-footer">
                    <span>Saved in this browser</span>
                    <button
                      className="icon-button"
                      aria-label={`Delete draft ${doc.name}`}
                      onClick={() => setRemoveDraft(doc)}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="form-note">No saved drafts match your search.</p>
          )}
        </section>
      )}
      <div className="workspace-tip">
        <span>GOOD TO KNOW</span>
        <p>
          Projects and templates are stored in your current browser. Download
          HTML or JSON to keep a portable copy.
        </p>
      </div>
      <Dialog
        open={!!remove}
        onOpenChange={open => {
          if (!open) setRemove(null);
        }}
      >
        <DialogContent className="cm-dialog">
          <DialogHeader>
            <DialogTitle>Delete “{remove?.name}”?</DialogTitle>
            <DialogDescription>
              This removes the project and its{" "}
              {data.documents.filter(d => d.projectId === remove?.id).length}{" "}
              saved templates from this browser. Export anything you want to
              keep first.
            </DialogDescription>
          </DialogHeader>
          <div className="dialog-actions">
            <button className="button outline" onClick={() => setRemove(null)}>
              Keep project
            </button>
            <button
              className="button danger"
              onClick={() => {
                try {
                  if (remove) deleteProject(remove.id);
                  setRemove(null);
                  toast.success("Project deleted from this browser.");
                } catch (error) {
                  toast.error((error as Error).message);
                }
              }}
            >
              Delete project <Trash2 size={15} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!removeDraft}
        onOpenChange={open => {
          if (!open) setRemoveDraft(null);
        }}
      >
        <DialogContent className="cm-dialog">
          <DialogHeader>
            <DialogTitle>Delete draft “{removeDraft?.name}”?</DialogTitle>
            <DialogDescription>
              This removes this draft from your current browser and frees a
              saved-template slot. Export anything you want to keep first.
            </DialogDescription>
          </DialogHeader>
          <div className="dialog-actions">
            <button
              className="button outline"
              onClick={() => setRemoveDraft(null)}
            >
              Keep draft
            </button>
            <button
              className="button danger"
              onClick={() => {
                try {
                  if (removeDraft) deleteDocument(removeDraft.id);
                  setRemoveDraft(null);
                  toast.success("Draft deleted from this browser.");
                } catch (error) {
                  toast.error((error as Error).message);
                }
              }}
            >
              Delete draft <Trash2 size={15} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </WorkspaceShell>
  );
}
