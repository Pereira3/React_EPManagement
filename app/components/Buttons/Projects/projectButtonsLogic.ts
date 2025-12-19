import { useEffect, useState } from "react";
import { validateProjectSubmit } from "../../Forms/formsValidation";
import { actionsProj, Project } from "../../../shared/types";

export function projectButtonsLogic(
  action: actionsProj,
  lstProjects: Project[],
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
  setAction: React.Dispatch<React.SetStateAction<actionsProj>>,
  projectSelected: Project | null,
  setSelectProject: React.Dispatch<React.SetStateAction<Project | null>>
) {
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

    const validation = validateProjectSubmit(lstProjects, projectName, 0, 10);

    // Check for duplicates
    if (validation.isValid) {
      setProjects((projects) => {
        const newProject: Project = {
          name: projectName,
        };
        return [...projects, newProject];
      });
      setAction(null);
    } else {
      setErrorNumber(errorNumber + 1);
      setError(validation.error);
    }
  };

  // ---------- Handler for the deletion of a project ----------
  const handleDelete = () => {
    if (projectSelected) {
      setProjects((prev) => {
        return prev.filter(
          (project) =>
            project.name.trim().toUpperCase() !==
            projectSelected.name.trim().toUpperCase()
        );
      });
      setAction(null);
      setSelectProject(null);
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
