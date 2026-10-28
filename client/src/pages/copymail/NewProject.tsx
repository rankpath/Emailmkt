import { useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowUpRight, FolderPlus, Check } from "lucide-react";
import { WorkspaceShell } from "../../components/copymail/WorkspaceShell";
import { useWorkspace } from "../../lib/workspace";
import { toast } from "sonner";

export default function NewProject() {
  const [, navigate] = useLocation();
  const { data, createProject } = useWorkspace();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const project = createProject(name, description);
      toast.success("A fresh start. Your project is ready.");
      navigate(`/projects/${project.id}`);
    } catch (err) {
      setError((err as Error).message);
    }
  }
  return (
    <WorkspaceShell title="New Project">
      <div className="new-project-page">
        <a href="/projects" className="back-link">
          <ArrowLeft size={15} />
          All projects
        </a>
        <div className="new-project-intro">
          <span className="new-project-symbol">
            <FolderPlus size={26} />
          </span>
          <h1>
            A fresh start<span className="accent-dot">.</span>
          </h1>
          <p>Give your next great email a place to call home.</p>
        </div>
        <form className="new-project-form cm-form" onSubmit={submit}>
          <label htmlFor="project-name">
            Project name
            <input
              id="project-name"
              value={name}
              onChange={event => {
                setName(event.target.value);
                setError("");
              }}
              placeholder="e.g. Q3 Newsletter Campaign"
              maxLength={80}
              aria-invalid={!!error}
              aria-describedby={error ? "project-error" : undefined}
              autoFocus
              required
            />
          </label>
          <label htmlFor="project-description">
            Description <span>(optional)</span>
            <textarea
              id="project-description"
              value={description}
              onChange={event => setDescription(event.target.value)}
              placeholder="What's this project about?"
              maxLength={500}
            />
          </label>
          {error && (
            <div className="form-error" id="project-error" role="alert">
              {error}
            </div>
          )}
          {data.projects.length >= 3 && (
            <p className="form-error">
              Your free workspace is full. Export and remove an existing project
              to create a new one.
            </p>
          )}
          <div className="new-project-actions">
            <a href="/projects" className="button outline">
              Cancel
            </a>
            <button
              className="button accent"
              type="submit"
              disabled={!name.trim() || data.projects.length >= 3}
            >
              Create Project <ArrowUpRight size={17} />
            </button>
          </div>
        </form>
        <div className="new-project-note">
          <Check size={14} /> Your free workspace includes 3 projects. No
          pressure. Just possibilities.
        </div>
      </div>
    </WorkspaceShell>
  );
}
