import { useEffect, useState } from "react";
import { validateProjectSubmit } from "../../Forms/formsValidation";
import { Project } from "../../../shared/types";
import { useSetters } from "@/app/context/Setters";

export function useProjectButtonsLogic() {
  const {
    lstofProjects,
    setProjects,
    selectedProject,
    setSelectedProject,
    action,
    setAction,
  } = useSetters();

  // For error handling
  const [errorMessage, setError] = useState<string>("");
  const [errorNumber, setErrorNumber] = useState<number>(0);
  const [projectName, setProjectName] = useState("");

  // Update form values when an action is defined (Button pressed)
  useEffect(() => {
    if (action === "Add") {
      setProjectName("");
      setError("");
      setErrorNumber(0);
    }
  }, [action]);

  const handleChange = (name: string) => {
    setProjectName(name);
  };

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
      setAction("None");
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
      setAction("None");
      setSelectedProject(null);
    }
  };

  return {
    projectName,
    errorMessage,
    errorNumber,
    handleChange,
    handleAddSubmit,
    handleDelete,
  };
}
