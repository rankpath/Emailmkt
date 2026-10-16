import { createContext, useContext, useState, type ReactNode } from "react";
import type { EmailDocument } from "../data/templates";

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};
export type WorkspaceData = { projects: Project[]; documents: EmailDocument[] };
const STORAGE_KEY = "copymail-workspace-v1";
const empty: WorkspaceData = { projects: [], documents: [] };

export function projectError(name: string, count: number): string | null {
  if (!name.trim()) return "Please enter a project name.";
  if (name.trim().length > 80)
    return "Project names must be 80 characters or fewer.";
  if (count >= 3) return "Your free workspace includes up to 3 projects.";
  return null;
}
export function documentError(
  data: WorkspaceData,
  doc: EmailDocument
): string | null {
  if (data.documents.some(d => d.id === doc.id)) return null;
  if (doc.projectId) {
    if (!data.projects.some(p => p.id === doc.projectId))
      return "This project no longer exists.";
    if (data.documents.filter(d => d.projectId === doc.projectId).length >= 5)
      return "This project has reached its limit of 5 templates.";
  }
  if (data.documents.length >= 15)
    return "Your free workspace includes up to 15 saved templates.";
  return null;
}
function loadWorkspace(): WorkspaceData {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const value = JSON.parse(raw);
    if (!Array.isArray(value.projects) || !Array.isArray(value.documents))
      return empty;
    return value;
  } catch {
    return empty;
  }
}

type WorkspaceContextValue = {
  data: WorkspaceData;
  createProject: (name: string, description: string) => Project;
  deleteProject: (id: string) => void;
  saveDocument: (doc: EmailDocument) => void;
  deleteDocument: (id: string) => void;
};
const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WorkspaceData>(loadWorkspace);
  function commit(next: WorkspaceData) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      throw new Error(
        "Your browser could not save this workspace. Check storage permissions or free space."
      );
    }
    setData(next);
  }
  function createProject(name: string, description: string) {
    const error = projectError(name, data.projects.length);
    if (error) throw new Error(error);
    const project = {
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
    };
    commit({ ...data, projects: [...data.projects, project] });
    return project;
  }
  function deleteProject(id: string) {
    commit({
      projects: data.projects.filter(p => p.id !== id),
      documents: data.documents.filter(d => d.projectId !== id),
    });
  }
  function saveDocument(doc: EmailDocument) {
    const error = documentError(data, doc);
    if (error) throw new Error(error);
    const saved = { ...doc, updatedAt: new Date().toISOString() };
    commit({
      ...data,
      documents: [...data.documents.filter(d => d.id !== saved.id), saved],
    });
  }
  function deleteDocument(id: string) {
    commit({ ...data, documents: data.documents.filter(d => d.id !== id) });
  }
  return (
    <WorkspaceContext.Provider
      value={{
        data,
        createProject,
        deleteProject,
        saveDocument,
        deleteDocument,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("WorkspaceProvider is required.");
  return context;
}
