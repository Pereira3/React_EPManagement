// ----- IMPORTS -----
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormsText from "../Forms/FormsText";
import { actionsProj, Project } from "@/app/types";
import { DialogContentText } from "@mui/material";

export default function ProjectButton({
  action,
  lstProjects,
  setProjects,
  setAction,
  projectSelected,
  setSelectProject,
}: {
  action: actionsProj;
  lstProjects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setAction: React.Dispatch<React.SetStateAction<actionsProj>>;
  projectSelected: Project | null;
  setSelectProject: React.Dispatch<React.SetStateAction<Project | null>>;
}) {
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
    // Check for duplicates
    if (
      !lstProjects.some(
        (project) =>
          project.name.trim().toUpperCase() === projectName.trim().toUpperCase()
      )
    ) {
      setProjects((projects) => {
        const newProject: Project = {
          name: projectName,
        };
        return [...projects, newProject];
      });
      setAction(null);
    } else {
      setError("Project already in Database");
      setErrorNumber(errorNumber + 1);
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

  if (!action) return null;

  // ---------- ADD ----------
  if (action === "Add") {
    return (
      <Dialog
        open={true}
        onClose={() => {
          setAction(null);
        }}
      >
        <DialogTitle>Add Project</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <DialogContentText>
              {errorMessage + " (" + errorNumber + ")"}
            </DialogContentText>
          )}
          <form onSubmit={handleAddSubmit} id="addProject-form">
            <FormsText
              type="text"
              setName="Name"
              value={projectName}
              updt={(val) => handleChange(val)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <button className="actionButton" type="submit" form="addProject-form">
            Add
          </button>
          <button
            onClick={() => {
              setAction(null);
            }}
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    );
  }

  // ---------- DELETE ----------
  if (action === "Delete") {
    if (projectSelected) {
      return (
        <Dialog
          open={true}
          onClose={() => {
            setAction(null);
            setSelectProject(null);
          }}
        >
          <DialogTitle>Delete Project</DialogTitle>
          <DialogContent>
            Are you sure you want to delete Project{" "}
            <strong>{projectSelected.name}</strong> and all the employees
            allocated to it?
          </DialogContent>
          <DialogActions>
            <button className="actionButton" onClick={handleDelete}>
              Delete
            </button>
            <button onClick={() => setAction(null)}>Cancel</button>
          </DialogActions>
        </Dialog>
      );
    } else {
      return (
        <Dialog open={true} onClose={() => setAction(null)}>
          <DialogTitle>Project Not Selected</DialogTitle>
          <DialogContent>
            You have to select one project to be able to delete it.
          </DialogContent>
          <DialogActions>
            <button className="actionButton" onClick={() => setAction(null)}>
              OK
            </button>
          </DialogActions>
        </Dialog>
      );
    }
  }

  return null;
}
