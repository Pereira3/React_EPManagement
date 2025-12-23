// ----- IMPORTS -----
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Forms from "@/app/components/Forms/Forms";
import { useSetters } from "@/app/context/Setters";
import { useEmployeeButtonsLogic } from "./useEmployeeButtonsLogic";

export default function EmployeesButton({ sets }: { sets: string[] }) {
  const { selectedEmployee, setSelectedEmployee, action, setAction } =
    useSetters();

  const logic = useEmployeeButtonsLogic();

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
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          {logic.errorMessage && (
            <DialogContentText>
              {logic.errorMessage + " (" + logic.errorNumber + ")"}
            </DialogContentText>
          )}
          <form onSubmit={logic.handleAddSubmit} id="addEmployee-form">
            <Forms
              forms="text"
              setName="Name"
              value={logic.formsValues.name}
              updt={(val) => logic.handleChange("name", val)}
            />
            <Forms
              forms="date"
              value={logic.formsValues.date}
              updt={(val) => logic.handleChange("date", val)}
            />
            <Forms
              forms="selector"
              value={logic.formsValues.role}
              updt={(val) => logic.handleChange("role", val)}
            />
            <Forms
              forms="dropdown"
              sets={sets}
              setName="Team"
              value={logic.formsValues.team}
              updt={(val) => logic.handleChange("team", val)}
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
              setAction("None");
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
            setAction("None");
            setSelectedEmployee(null);
          }}
        >
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent>
            {logic.errorMessage && (
              <DialogContentText>
                {logic.errorMessage + " (" + logic.errorNumber + ")"}
              </DialogContentText>
            )}
            <form onSubmit={logic.handleEditSubmit} id="editEmployee-form">
              <Forms
                forms="text"
                setName="Name"
                value={logic.formsValues.name}
                updt={(val) => logic.handleChange("name", val)}
              />
              <Forms
                forms="date"
                value={logic.formsValues.date}
                updt={(value) => logic.handleChange("date", value)}
              />
              <Forms
                forms="selector"
                value={logic.formsValues.role}
                updt={(val) => logic.handleChange("role", val)}
              />
              <Forms
                forms="dropdown"
                sets={sets}
                setName="Team"
                value={logic.formsValues.team}
                updt={(val) => logic.handleChange("team", val)}
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
            <button onClick={() => setAction("None")}>Cancel</button>
          </DialogActions>
        </Dialog>
      );
    } else {
      return (
        <Dialog open={true} onClose={() => setAction("None")}>
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
            setAction("None");
            setSelectedEmployee(null);
          }}
        >
          <DialogTitle>Delete Employee</DialogTitle>
          <DialogContent>
            Are you sure you want to delete Employee{" "}
            <strong>{selectedEmployee.name}</strong> and this allocation to
            projects?
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
