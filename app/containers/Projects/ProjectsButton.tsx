// ---------- IMPORTS ----------
import "../containers.css";
// Importing MUI Components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";
// Importing Components
import Forms from "@/app/components/Forms/Forms";
// Importing Contexts
import { useProjectContext } from "@/app/context/ProjectContext";
import { useDialogContext } from "@/app/context/DialogContext";
import { useProjectsLogic } from "./useProjectsLogic";
import { useErrorContext } from "@/app/context/ErrorContext";

export default function ProjectButton() {

  const { action, setAction } = useDialogContext();
  const { selectedProject } = useProjectContext();

  const { errorMessage, errorNumber } = useErrorContext();
  const { clearSelectionsAndErrors, handleAddSubmit, handleChange, handleDelete, projectName } = useProjectsLogic();

  if (!action) return null;

  // ---------- ADD ----------
  if (action === "Add") {
    return (
      <Dialog
        open={true}
        onClose={() => {
          clearSelectionsAndErrors();
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
            <Forms
              forms="text"
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
              clearSelectionsAndErrors();
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
    if (selectedProject) {
      return (
        <Dialog
          open={true}
          onClose={() => {
            clearSelectionsAndErrors();
          }}
        >
          <DialogTitle>Delete Project</DialogTitle>
          <DialogContent>
            Are you sure you want to delete Project{" "}
            <strong>{selectedProject.name}</strong> and all employees allocation associated to it?
          </DialogContent>
          <DialogActions>
            <button className="actionButton" onClick={handleDelete}>
              Delete
            </button>
            <button onClick={() => clearSelectionsAndErrors() }>Cancel</button>
          </DialogActions>
        </Dialog>
      );
    } else {
      return (
        <Dialog open={true} onClose={() => clearSelectionsAndErrors()}>
          <DialogTitle>Project Not Selected</DialogTitle>
          <DialogContent>
            You have to select one project to be able to delete it.
          </DialogContent>
          <DialogActions>
            <button className="actionButton" onClick={() => setAction("None")}>
              OK
            </button>
          </DialogActions>
        </Dialog>
      );
    }
  }

  return null;
}
