import { useState, useEffect } from "react";
import { Employee } from "../../../shared/types";
import { validateEmployeeSubmit } from "../../Forms/formsValidation";
import dayjs from "dayjs";
import { useSetters } from "@/app/context/Setters";

export function useEmployeeButtonsLogic() {
  const {
    lstofEmployees,
    setEmployees,
    selectedEmployee,
    setSelectedEmployee,
    action,
    setAction,
    formsValues,
    setFormValues,
  } = useSetters();

  // For error handling
  const [errorMessage, setError] = useState<string>("");
  const [errorNumber, setErrorNumber] = useState<number>(0);

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
    // Clear errors when dialog opens
    setError("");
    setErrorNumber(0);
  }, [action, selectedEmployee]);

  // Handler for individual field changes
  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

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
      setAction("None");
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
        setAction("None");
        setSelectedEmployee(null);
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
      setAction("None");
      setSelectedEmployee(null);
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
  };
}
