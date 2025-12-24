// ---------- IMPORTS ----------
import "../../../containers/containers.css";
// Importing MUI Components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";
// Importing Components
import Forms from "@/app/components/Forms/Forms";
// Importing Contexts
import { useWebContext } from "@/app/context/WebContext";
import { useProjectContext } from "@/app/context/ProjectContext";
import { useProjectsLogic } from "./useProjectsLogic";

export default function ProjectButton() {

  const { action, setAction } = useWebContext();
  const { selectedProject } = useProjectContext();

  const logic = useProjectsLogic();

  if (!action) return "None";

  // ---------- ADD ----------
  if (action === "Add") {
    return (
      <Dialog
        open={true}
        onClose={() => {
          logic.clearSelectionsAndErrors();
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
              logic.clearSelectionsAndErrors();
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
            logic.clearSelectionsAndErrors();
          }}
        >
          <DialogTitle>Delete Project</DialogTitle>
          <DialogContent>
            Are you sure you want to delete Project{" "}
            <strong>{selectedProject.name}</strong> and all employees allocation associated to it?
          </DialogContent>
          <DialogActions>
            <button className="actionButton" onClick={logic.handleDelete}>
              Delete
            </button>
            <button onClick={() => logic.clearSelectionsAndErrors() }>Cancel</button>
          </DialogActions>
        </Dialog>
      );
    } else {
      return (
        <Dialog open={true} onClose={() => logic.clearSelectionsAndErrors()}>
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
