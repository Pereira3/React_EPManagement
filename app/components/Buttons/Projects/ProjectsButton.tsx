// ----- IMPORTS -----
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { actionsProj, Project } from "@/app/shared/types";
import { DialogContentText } from "@mui/material";
import Forms from "@/app/components/Forms/Forms";
import { projectButtonsLogic } from "./projectButtonsLogic";

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
  const logic = projectButtonsLogic(
    action,
    lstProjects,
    setProjects,
    setAction,
    projectSelected,
    setSelectProject
  );

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
          {logic.errorMessage && (
            <DialogContentText>
              {logic.errorMessage + " (" + logic.errorNumber + ")"}
            </DialogContentText>
          )}
          <form onSubmit={logic.handleAddSubmit} id="addProject-form">
            <Forms
              forms="text"
              setName="Name"
              value={logic.projectName}
              updt={(val) => logic.handleChange(val)}
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
            <button className="actionButton" onClick={logic.handleDelete}>
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
