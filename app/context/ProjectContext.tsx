"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Project } from "@/app/shared/types";
import { ProjectContextTypes } from "@/app/context/Types-Data/types";
import { initialProjects } from "@/app/context/Types-Data/initialData";

// Create the context
const ProjectContext = createContext<ProjectContextTypes | undefined>(
  undefined
);

// Provider component
export function ProjectContextProvider({ children }: { children: ReactNode }) {
  // Created List of Projects initializated with initialData.ts file
  const [lstofProjects, setProjects] = useState<Project[]>(initialProjects);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <ProjectContext.Provider
      value={{
        lstofProjects,
        setProjects,
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

// Custom hook to use the context
export function useProjectContext() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error(
      "useProjectContext must be used within a ProjectContextProvider."
    );
  }
  return context;
}
