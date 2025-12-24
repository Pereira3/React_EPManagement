// ---------- IMPORTS ----------
import { useState } from "react";
// Importing Validation Functions
import { validateProjectSubmit } from "../../Forms/formsValidation";
// Importing Types
import { Project } from "../../../shared/types";
// Importing Contexts
import { useProjectContext } from "@/app/context/ProjectContext";
import { useWebContext } from "@/app/context/WebContext";

export function useProjectsLogic() {

  const { setAction } = useWebContext();
  const {
    lstofProjects,
    setProjects,
    selectedProject,
    setSelectedProject,
  } = useProjectContext();

  // For error handling
  const [errorMessage, setError] = useState<string>("");
  const [errorNumber, setErrorNumber] = useState<number>(0);
  const [projectName, setProjectName] = useState("");

  const handleChange = (name: string) => {
    setProjectName(name);
  };

  function clearSelectionsAndErrors() {
    setError("");
    setAction("None");
    setErrorNumber(0);
    setProjectName("");
    setSelectedProject(null);
  }

  // ---------- Handler for the addition of a project ----------
  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateProjectSubmit(lstofProjects, projectName, 0, 10);

    // Check for duplicates
    if (validation.isValid) {
      setProjects((projects) => {
        const newProject: Project = {
          name: projectName,
        };
        return [...projects, newProject];
      });
      clearSelectionsAndErrors();
    } else {
      setErrorNumber(errorNumber + 1);
      setError(validation.error);
    }
  };

  // ---------- Handler for the deletion of a project ----------
  const handleDelete = () => {
    if (selectedProject) {
      setProjects((prev) => {
        return prev.filter(
          (project) =>
            project.name.trim().toUpperCase() !==
            selectedProject.name.trim().toUpperCase()
        );
      });
      clearSelectionsAndErrors();
    }
  };

  return {
    projectName,
    errorMessage,
    errorNumber,
    handleChange,
    handleAddSubmit,
    handleDelete,
    clearSelectionsAndErrors,
  };
}
