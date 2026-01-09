// ---------- IMPORTS ----------
import { useState } from "react";
// Importing Validation Functions
import { validateProjectSubmit } from "../../Forms/formsValidation";
// Importing Types
import { Project } from "../../../shared/types";
// Importing Contexts
import { useProjectContext } from "@/app/context/ProjectContext";
import { useDialogContext } from "@/app/context/DialogContext";
import { useErrorContext } from "@/app/context/ErrorContext";
import { normalizedString } from "@/app/shared/utils";

export function useProjectsLogic() {

  const { setAction } = useDialogContext();
  const {
    lstofProjects,
    setProjects,
    selectedProject,
    setSelectedProject,
  } = useProjectContext();

  // For error handling
  const { errorMessage, setError, errorNumber, setErrorNumber } = useErrorContext();
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

    const validation = validateProjectSubmit(lstofProjects, projectName);

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
            normalizedString(project.name) !==
            normalizedString(selectedProject.name)
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
