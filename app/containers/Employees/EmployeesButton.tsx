// ----- IMPORTS -----
import "../containers.css";
// Importing MUI Components
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Forms from "@/app/components/Forms/Forms";
// Importing Contexts
import { useDialogContext } from "@/app/context/DialogContext";
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useEmployeesLogic } from "./useEmployeesLogic";

import { teamsAvailable } from "@/app/context/data/initialData";
import { useFormsContext } from "@/app/context/FormsContext";
import { useErrorContext } from "@/app/context/ErrorContext";

export default function EmployeesButton() {
  const { action, setAction } = useDialogContext();
  const { selectedEmployee } = useEmployeeContext();
  const { formsValues } = useFormsContext();
  const { errorMessage, errorNumber } = useErrorContext();

  const {
    clearSelectionsAndErrors,
    handleAddSubmit,
    handleEditSubmit,
    handleDelete,
    handleChange,
  } = useEmployeesLogic();

  if (!action) return "None";

  // ---------- ADD ----------
  if (action === "Add") {
    return (
      <Dialog open={true} onClose={() => clearSelectionsAndErrors()}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <DialogContentText>
              {errorMessage + " (" + errorNumber + ")"}
            </DialogContentText>
          )}
          <form onSubmit={handleAddSubmit} id="addEmployee-form">
            <Forms
              forms="text"
              setName="Name"
              value={formsValues.name}
              updt={(val) => handleChange("name", val)}
            />
            <Forms
              forms="date"
              value={formsValues.date}
              updt={(val) => handleChange("date", val)}
            />
            <Forms
              forms="selector"
              value={formsValues.role}
              updt={(val) => handleChange("role", val)}
            />
            <Forms
              forms="dropdown"
              sets={teamsAvailable}
              setName="Team"
              value={formsValues.team}
              updt={(val) => handleChange("team", val)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <button
            className="actionButton"
            type="submit"
            form="addEmployee-form"
          >
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

  // ---------- EDIT ----------
  if (action === "Edit") {
    if (selectedEmployee) {
      return (
        <Dialog
          open={true}
          onClose={() => {
            clearSelectionsAndErrors();
          }}
        >
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent>
            {errorMessage && (
              <DialogContentText>
                {errorMessage + " (" + errorNumber + ")"}
              </DialogContentText>
            )}
            <form onSubmit={handleEditSubmit} id="editEmployee-form">
              <Forms
                forms="text"
                setName="Name"
                value={formsValues.name}
                updt={(val) => handleChange("name", val)}
              />
              <Forms
                forms="date"
                value={formsValues.date}
                updt={(value) => handleChange("date", value)}
              />
              <Forms
                forms="selector"
                value={formsValues.role}
                updt={(val) => handleChange("role", val)}
              />
              <Forms
                forms="dropdown"
                sets={teamsAvailable}
                setName="Team"
                value={formsValues.team}
                updt={(val) => handleChange("team", val)}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <button
              className="actionButton"
              type="submit"
              form="editEmployee-form"
            >
              Edit
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
    } else {
      return (
        <Dialog
          open={true}
          onClose={() => {
            clearSelectionsAndErrors();
          }}
        >
          <DialogTitle>Employee Not Selected</DialogTitle>
          <DialogContent>
            You have to select one employee to be able to edit it.
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

  // ---------- DELETE ----------
  if (action === "Delete") {
    if (selectedEmployee) {
      return (
        <Dialog
          open={true}
          onClose={() => {
            clearSelectionsAndErrors();
          }}
        >
          <DialogTitle>Delete Employee</DialogTitle>
          <DialogContent>
            Are you sure you want to delete Employee{" "}
            <strong>{selectedEmployee.name}</strong> and this allocation to
            projects?
          </DialogContent>
          <DialogActions>
            <button className="actionButton" onClick={handleDelete}>
              Delete
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
    } else {
      return (
        <Dialog
          open={true}
          onClose={() => {
            clearSelectionsAndErrors();
          }}
        >
          <DialogTitle>Employee Not Selected</DialogTitle>
          <DialogContent>
            You have to select one employee to be able to delete it.
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
