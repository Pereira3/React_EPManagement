// ----- IMPORTS -----
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormsText from "../Forms/FormsText";
import FormsDate from "../Forms/FormsDate";
import FormsSelector from "../Forms/FormsSelector";
import FormsDropdown from "../Forms/FormsDropdown";
import { actionsEmp, Employee } from "@/app/types";
import dayjs, { Dayjs } from "dayjs";

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
  // For error handling
  const [errorMessage, setError] = useState<string>("");
  const [errorNumber, setErrorNumber] = useState<number>(0);
  // Depending on the action the form values will be different
  // Default values will be empty except date, which will be initiated as the current date
  const [formValues, setFormValues] = useState<{
    name: string;
    date: Dayjs;
    role: string;
    team: string;
  }>({
    name: "",
    date: dayjs(),
    role: "None",
    team: "Not Defined",
  });

  // Update form values when an action is defined (Button pressed)
  useEffect(() => {
    if (action === "Edit" && employeeSelected) {
      setFormValues({
        name: employeeSelected.name,
        date: dayjs(employeeSelected.date, "DD-MM-YYYY"),
        role: employeeSelected.role,
        team: employeeSelected.team,
      });
    } else if (action === "Add") {
      setFormValues({
        name: "",
        date: dayjs(),
        role: "None",
        team: "Not Defined",
      });
      setError("");
      setErrorNumber(0);
    }
  }, [action, employeeSelected]);

  // ---------- Handler for the individual edition of form fields ----------
  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // ---------- Handler for the addition of an employee ----------
  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dateFormatted = formValues.date.format("DD-MM-YYYY");
    // Check for duplicates
    if (
      !lstEmployees.some(
        (emp) =>
          emp.name.trim().toUpperCase() === formValues.name.trim().toUpperCase()
      )
    ) {
      setEmployees((employees) => {
        const newEmployee: Employee = {
          name: formValues.name,
          date: dateFormatted,
          role: formValues.role,
          team: formValues.team,
        };
        return [...employees, newEmployee];
      });
      setAction(null);
    } else {
      setError("Employee already in Database");
      setErrorNumber(errorNumber + 1);
    }
  };

  // ---------- Handler for the edition of an employee ----------
  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dateFormatted = formValues.date.format("DD-MM-YYYY");

    if (employeeSelected) {
      // Check if new name conflicts with other employees
      const isDuplicate = lstEmployees.some(
        (emp) =>
          emp.name.trim().toUpperCase() ===
            formValues.name.trim().toUpperCase() &&
          emp.name.trim().toUpperCase() !==
            employeeSelected.name.trim().toUpperCase()
      );

      if (!isDuplicate) {
        setEmployees((prev) => {
          return prev.map((employee) =>
            employee.name.trim().toUpperCase() ===
            employeeSelected.name.trim().toUpperCase()
              ? {
                  ...employee,
                  name: formValues.name,
                  date: dateFormatted,
                  role: formValues.role,
                  team: formValues.team,
                }
              : employee
          );
        });
        setAction(null);
        setSelectEmployee(null);
      } else {
        setError("Employee name already exists");
        setErrorNumber(errorNumber + 1);
      }
    }
  };

  // ---------- Handler for the deletion of an employee ----------
  const handleDelete = () => {
    if (employeeSelected) {
      setEmployees((prev) =>
        prev.filter(
          (emp) =>
            emp.name.trim().toUpperCase() !==
            employeeSelected.name.trim().toUpperCase()
        )
      );
      setAction(null);
      setSelectEmployee(null);
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
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          {errorMessage && (
            <DialogContentText>
              {errorMessage + " (" + errorNumber + ")"}
            </DialogContentText>
          )}
          <form onSubmit={handleAddSubmit} id="addEmployee-form">
            <FormsText
              type="text"
              setName="Name"
              value={formValues.name}
              updt={(val) => handleChange("name", val)}
            />
            <FormsDate
              value={formValues.date}
              updt={(val) => handleChange("date", val)}
            />
            <FormsSelector
              value={formValues.role}
              updt={(val) => handleChange("role", val)}
            />
            <FormsDropdown
              sets={sets}
              setName="Team"
              value={formValues.team}
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
            {errorMessage && (
              <DialogContentText>
                {errorMessage + " (" + errorNumber + ")"}
              </DialogContentText>
            )}
            <form onSubmit={handleEditSubmit} id="editEmployee-form">
              <FormsText
                type="text"
                setName="Name"
                value={formValues.name}
                updt={(val) => handleChange("name", val)}
              />
              <FormsDate
                value={formValues.date}
                updt={(value) => handleChange("date", value)}
              />
              <FormsSelector
                value={formValues.role}
                updt={(val) => handleChange("role", val)}
              />
              <FormsDropdown
                sets={sets}
                setName="Team"
                value={formValues.team}
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