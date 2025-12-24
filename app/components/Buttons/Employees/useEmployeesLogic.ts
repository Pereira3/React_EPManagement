// ---------- IMPORTS ----------
import { useEffect } from "react";
import dayjs from "dayjs";
// Importing Types
import { Employee } from "../../../shared/types";
// Importing Validation Functions
import { validateEmployeeSubmit } from "../../Forms/formsValidation";
// Importing Contexts
import { useWebContext } from "@/app/context/WebContext";
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useProjectContext } from "@/app/context/ProjectContext";

export function useEmployeesLogic() {
  const {
    action,
    setAction,
    formsValues,
    setFormValues,
    errorMessage,
    setError,
    errorNumber,
    setErrorNumber,
  } = useWebContext();
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
            employee.name.trim().toUpperCase() ===
            selectedEmployee.name.trim().toUpperCase()
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
            emp.name.trim().toUpperCase() !==
            selectedEmployee.name.trim().toUpperCase()
        )
      );

      setProjects((prev) =>
        prev.map((project) =>
          project.employees
            ? {
                ...project,
                employees: project.employees.filter(
                  (proj) =>
                    proj.emp.name.trim().toUpperCase() !==
                    selectedEmployee.name.trim().toUpperCase()
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
