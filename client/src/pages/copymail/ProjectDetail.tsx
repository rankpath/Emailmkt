import { useState } from "react";
import {
  ArrowLeft,
  Plus,
  ArrowUpRight,
  LayoutTemplate,
  Trash2,
} from "lucide-react";
import { WorkspaceShell } from "../../components/copymail/WorkspaceShell";
import { TemplateCard } from "../../components/copymail/EmailView";
import { useWorkspace } from "../../lib/workspace";
import type { EmailDocument } from "../../data/templates";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { toast } from "sonner";

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const { data, deleteDocument } = useWorkspace();
  const [remove, setRemove] = useState<EmailDocument | null>(null);
  const project = data.projects.find(p => p.id === params.id);
  const docs = data.documents.filter(d => d.projectId === params.id);
  if (!project)
    return (
      <WorkspaceShell title="Project">
        <div className="empty-state">
          <LayoutTemplate size={38} />
          <h1>Project not found.</h1>
          <p>It may have been removed, or saved in another browser.</p>
          <a className="button black" href="/projects">
            Back to projects <ArrowUpRight size={17} />
          </a>
        </div>
      </WorkspaceShell>
    );
  return (
    <WorkspaceShell title={project.name}>
      <a href="/projects" className="back-link">
        <ArrowLeft size={15} />
        All projects
      </a>
      <div className="workspace-title project-detail-title">
        <div>
          <span className="eyebrow">
            <span />
            Your creative workspace
          </span>
          <h1>
            {project.name}
            <span className="accent-dot">.</span>
          </h1>
          <p>{project.description || "Your next great email starts here."}</p>
        </div>
        {docs.length < 5 && (
          <a href={`/templates?project=${project.id}`} className="button black">
            <Plus size={17} />
            Add a template
          </a>
        )}
      </div>
      <div className="project-detail-bar">
        <span>{docs.length} of 5 templates</span>
        <span>Saved in this browser</span>
      </div>
      {docs.length ? (
        <div className="template-grid project-template-grid">
          {docs.map(doc => (
            <div key={doc.id}>
              <TemplateCard document={doc} href={`/studio/${doc.id}`} />
              <div className="saved-template-footer">
                <span>
                  Updated{" "}
                  {new Date(
                    doc.updatedAt || project.createdAt
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <button
                  aria-label={`Remove ${doc.name}`}
                  className="icon-button"
                  onClick={() => setRemove(doc)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state workspace-empty">
          <div className="empty-illustration">
            <LayoutTemplate size={55} strokeWidth={1.2} />
            <span>✳</span>
          </div>
          <h2>Let’s give this project a little personality.</h2>
          <p>
            Start with an editable template. Add your colors, your words,\nand a
            little something that makes it yours.
          </p>
          <a href={`/templates?project=${project.id}`} className="button black">
            Find a template <ArrowUpRight size={17} />
          </a>
        </div>
      )}
      {docs.length >= 5 && (
        <p className="workspace-tip">
          This project has 5 templates — your free-plan limit. Export a template
          before removing it to make room.
        </p>
      )}
      <Dialog
        open={!!remove}
        onOpenChange={open => {
          if (!open) setRemove(null);
        }}
      >
        <DialogContent className="cm-dialog">
          <DialogHeader>
            <DialogTitle>Remove “{remove?.name}”?</DialogTitle>
            <DialogDescription>
              This deletes this saved template from your current browser. An
              exported file is not affected.
            </DialogDescription>
          </DialogHeader>
          <div className="dialog-actions">
            <button className="button outline" onClick={() => setRemove(null)}>
              Keep template
            </button>
            <button
              className="button danger"
              onClick={() => {
                try {
                  if (remove) deleteDocument(remove.id);
                  setRemove(null);
                  toast.success("Template removed.");
                } catch (error) {
                  toast.error((error as Error).message);
                }
              }}
            >
              Remove template <Trash2 size={15} />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </WorkspaceShell>
  );
}
