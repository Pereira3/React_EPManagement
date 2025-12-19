// ----- IMPORTS -----
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { actionsEmp, Employee } from "@/app/shared/types";
import Forms from "@/app/components/Forms/Forms";
import { employeeButtonsLogic } from "./employeeButtonsLogic";

export default function EmployeesButton({
  action,
  lstEmployees,
  setEmployees,
  setAction,
  employeeSelected,
  setSelectEmployee,
  sets,
}: {
  action: actionsEmp;
  lstEmployees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  setAction: React.Dispatch<React.SetStateAction<actionsEmp>>;
  employeeSelected: Employee | null;
  setSelectEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
  sets: string[];
}) {
  const logic = employeeButtonsLogic(
    action,
    lstEmployees,
    setEmployees,
    setAction,
    employeeSelected,
    setSelectEmployee
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
              setAction(null);
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
    if (employeeSelected) {
      return (
        <Dialog
          open={true}
          onClose={() => {
            setAction(null);
            setSelectEmployee(null);
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
            <button onClick={() => setAction(null)}>Cancel</button>
          </DialogActions>
        </Dialog>
      );
    } else {
      return (
        <Dialog open={true} onClose={() => setAction(null)}>
          <DialogTitle>Employee Not Selected</DialogTitle>
          <DialogContent>
            You have to select one employee to be able to edit it.
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

  // ---------- DELETE ----------
  if (action === "Delete") {
    if (employeeSelected) {
      return (
        <Dialog
          open={true}
          onClose={() => {
            setAction(null);
            setSelectEmployee(null);
          }}
        >
          <DialogTitle>Delete Employee</DialogTitle>
          <DialogContent>
            Are you sure you want to delete Employee{" "}
            <strong>{employeeSelected.name}</strong> and this allocation to
            projects?
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
          <DialogTitle>Employee Not Selected</DialogTitle>
          <DialogContent>
            You have to select one employee to be able to delete it.
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
