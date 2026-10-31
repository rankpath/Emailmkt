import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WorkspaceProvider } from "./lib/workspace";
import Home from "./pages/Home";
import Templates from "./pages/copymail/Templates";
import Workspace from "./pages/copymail/Workspace";
import NewProject from "./pages/copymail/NewProject";
import ProjectDetail from "./pages/copymail/ProjectDetail";
import Studio from "./pages/copymail/Studio";
import Preview from "./pages/copymail/Preview";
import { Logo } from "./components/copymail/EmailView";

function Routes() {
  const [location] = useLocation();
  useEffect(() => {
    const isPublic = location === "/" || location === "/templates";
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (isPublic) {
      robots?.remove();
    } else {
      if (!robots) {
        robots = document.createElement("meta");
        robots.name = "robots";
        document.head.appendChild(robots);
      }
      robots.content = "noindex,nofollow";
    }
    if (location.startsWith("/studio/")) return;
    const titles: Record<string, string> = {
      "/": "Email Sketch by Adscraft Digital — Email Templates, Made Yours",
      "/templates": "Email Template Library — Email Sketch by Adscraft Digital",
      "/projects": "Your Projects — Email Sketch by Adscraft Digital",
      "/projects/new": "New Project — Email Sketch by Adscraft Digital",
      "/preview": "Shared Email Preview — Email Sketch by Adscraft Digital",
    };
    document.title =
      titles[location] || "Your Workspace — Email Sketch by Adscraft Digital";
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [location]);
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/templates" component={Templates} />
      <Route path="/projects" component={Workspace} />
      <Route path="/projects/new" component={NewProject} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/studio/:id" component={Studio} />
      <Route path="/preview" component={Preview} />
      <Route>
        <div className="not-found-page">
          <Logo />
          <h1>Looks like a blank canvas.</h1>
          <p>
            This page doesn’t exist. Let’s find you a better starting point.
          </p>
          <a className="button black" href="/">
            Back to Email Sketch ↗
          </a>
        </div>
      </Route>
    </Switch>
  );
}
export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <WorkspaceProvider>
            <Toaster position="bottom-right" />
            <Routes />
          </WorkspaceProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
