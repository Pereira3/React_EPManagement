// ---------- IMPORTS ----------
import { useEffect } from "react";
import dayjs from "dayjs";
// Importing Types
import { Employee } from "../../../shared/types";
// Importing Validation Functions
import { validateEmployeeSubmit } from "../../Forms/formsValidation";
// Importing Contexts
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useProjectContext } from "@/app/context/ProjectContext";
import { useDialogContext } from "@/app/context/DialogContext";
import { useFormsContext } from "@/app/context/FormsContext";
import { useErrorContext } from "@/app/context/ErrorContext";
import { normalizedString } from "@/app/shared/utils";

export function useEmployeesLogic() {
  const { action, setAction } = useDialogContext();
  const { formsValues, setFormValues } = useFormsContext();
  const { errorMessage, setError, errorNumber, setErrorNumber } = useErrorContext();
  const {
    lstofEmployees,
    setEmployees,
    selectedEmployee,
    setSelectedEmployee,
  } = useEmployeeContext();
  const { setProjects } = useProjectContext();

  // Update form values when action changes
  useEffect(() => {
    if (action === "Edit" && selectedEmployee) {
      setFormValues({
        name: selectedEmployee.name,
        date: selectedEmployee.date,
        role: selectedEmployee.role,
        team: selectedEmployee.team,
      });
    }

    if (action === "Add") {
      setFormValues({
        name: "",
        date: dayjs().format("DD-MM-YYYY"),
        role: "None",
        team: "Not Defined",
      });
    }
  }, [action, selectedEmployee, setFormValues]);

  // Handler for individual field changes
  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // Clear selections and errors
  function clearSelectionsAndErrors() {
    setError("");
    setAction("None");
    setErrorNumber(0);
    setSelectedEmployee(null);
  }

  // Handler for adding an employee
  // Default value was type date, which would flag an error, for that reason the validation of type was necessary
  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateEmployeeSubmit(formsValues, lstofEmployees);

    if (validation.isValid) {
      setEmployees((employees) => {
        const newEmployee: Employee = {
          name: formsValues.name,
          date: formsValues.date,
          role: formsValues.role,
          team: formsValues.team,
        };
        return [...employees, newEmployee];
      });
      clearSelectionsAndErrors();
    } else {
      setErrorNumber(errorNumber + 1);
      setError(validation.error);
    }
  };

  // Handler for editing an employee
  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedEmployee) {
      const validation = validateEmployeeSubmit(
        formsValues,
        lstofEmployees,
        selectedEmployee.name
      );

      if (validation.isValid) {
        setEmployees((prev) => {
          return prev.map((employee) =>
            normalizedString(employee.name) ===
            normalizedString(selectedEmployee.name)
              ? {
                  ...employee,
                  name: formsValues.name,
                  date: formsValues.date,
                  role: formsValues.role,
                  team: formsValues.team,
                }
              : employee
          );
        });
        clearSelectionsAndErrors();
      } else {
        setErrorNumber(errorNumber + 1);
        setError(validation.error);
      }
    }
  };

  // Handler for deleting an employee
  const handleDelete = () => {
    if (selectedEmployee) {
      setEmployees((prev) =>
        prev.filter(
          (emp) =>
            normalizedString(emp.name) !==
            normalizedString(selectedEmployee.name)
        )
      );

      setProjects((prev) =>
        prev.map((project) =>
          project.employees
            ? {
                ...project,
                employees: project.employees.filter(
                  (proj) =>
                    normalizedString(proj.emp.name) !==
                    normalizedString(selectedEmployee.name)
                ),
              }
            : project
        )
      );

      clearSelectionsAndErrors();
    }
  };

  return {
    formsValues,
    errorMessage,
    errorNumber,
    handleChange,
    handleAddSubmit,
    handleEditSubmit,
    handleDelete,
    clearSelectionsAndErrors,
  };
}
