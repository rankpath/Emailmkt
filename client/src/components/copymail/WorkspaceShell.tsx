import { useState, type ReactNode } from "react";
import {
  FolderOpen,
  LayoutTemplate,
  ArrowUpRight,
  Menu,
  X,
  CircleHelp,
  Monitor,
  ChevronDown,
} from "lucide-react";
import { Logo } from "./EmailView";
import { useWorkspace } from "../../lib/workspace";
import { InfoDialog } from "./Dialogs";

export function WorkspaceShell({
  children,
  title = "Projects",
  active = "Projects",
}: {
  children: ReactNode;
  title?: string;
  active?: string;
}) {
  const [menu, setMenu] = useState(false);
  const [help, setHelp] = useState(false);
  const { data } = useWorkspace();
  return (
    <div className="workspace-app">
      <aside className={`workspace-sidebar ${menu ? "open" : ""}`}>
        <div className="sidebar-logo">
          <Logo />
          <button
            className="mobile-menu icon-button"
            onClick={() => setMenu(false)}
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>
        <div className="workspace-picker">
          <span className="workspace-avatar">Y</span>
          <div>
            <strong>Your workspace</strong>
            <small>Free plan</small>
          </div>
          <ChevronDown size={15} />
        </div>
        <nav aria-label="Workspace navigation">
          <a className={active === "Projects" ? "active" : ""} href="/projects">
            <FolderOpen size={18} />
            Projects<span>{data.projects.length}</span>
          </a>
          <a href="/templates">
            <LayoutTemplate size={18} />
            Template library
            <ArrowUpRight size={14} />
          </a>
        </nav>
        <div className="sidebar-spacer" />
        <div className="local-storage-note">
          <Monitor size={20} />
          <strong>Your ideas live here.</strong>
          <p>
            Projects are saved in this browser. Export your work to keep a
            backup.
          </p>
          <span>{data.projects.length} / 3 projects</span>
          <div className="usage-meter">
            <i style={{ width: `${(data.projects.length / 3) * 100}%` }} />
          </div>
        </div>
        <button className="sidebar-help" onClick={() => setHelp(true)}>
          <CircleHelp size={17} />A little help
        </button>
        <a className="sidebar-home" href="/">
          Back to Email Sketch <ArrowUpRight size={15} />
        </a>
      </aside>
      {menu && (
        <button
          className="sidebar-overlay"
          aria-label="Close sidebar"
          onClick={() => setMenu(false)}
        />
      )}
      <div className="workspace-main">
        <header className="workspace-header">
          <div>
            <button
              className="mobile-menu icon-button"
              aria-label="Open sidebar"
              onClick={() => setMenu(true)}
            >
              <Menu size={21} />
            </button>
            <span>{title}</span>
          </div>
          <span className="workspace-header-right">
            <span className="local-label">
              <span className="status-dot" /> Saved in this browser
            </span>
            <span className="user-avatar">Y</span>
          </span>
        </header>
        <main className="workspace-content">{children}</main>
      </div>
      <InfoDialog
        title={help ? "A little help for your next big idea." : ""}
        text="Create a project, browse the example template library, then customize in Studio. Your free workspace includes 3 projects and 5 templates per project. Saved drafts live in this browser; HTML and JSON downloads are your portable backups. Sharing a preview link shares the content encoded in that link."
        onClose={() => setHelp(false)}
      />
    </div>
  );
}
