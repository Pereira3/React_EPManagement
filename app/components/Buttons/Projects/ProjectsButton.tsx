// ----- IMPORTS -----
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";
import Forms from "@/app/components/Forms/Forms";
import { useSetters } from "@/app/context/Setters";
import { useProjectButtonsLogic } from "./useProjectButtonsLogic";

export default function ProjectButton() {

  const { selectedProject, setSelectedProject, action, setAction } = useSetters();
  
  const logic = useProjectButtonsLogic();

  if (!action) return "None";

  // ---------- ADD ----------
  if (action === "Add") {
    return (
      <Dialog
        open={true}
        onClose={() => {
          setAction("None");
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
              setAction("None");
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
            setAction("None");
            setSelectedProject(null);
          }}
        >
          <DialogTitle>Delete Project</DialogTitle>
          <DialogContent>
            Are you sure you want to delete Project{" "}
            <strong>{selectedProject.name}</strong> and all the employees
            allocated to it?
          </DialogContent>
          <DialogActions>
            <button className="actionButton" onClick={logic.handleDelete}>
              Delete
            </button>
            <button onClick={() => setAction("None")}>Cancel</button>
          </DialogActions>
        </Dialog>
      );
    } else {
      return (
        <Dialog open={true} onClose={() => setAction("None")}>
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
