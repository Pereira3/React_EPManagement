import { useState, useEffect } from "react";
import { Employee, formsValues, actionsEmp } from "../../../shared/types";
import { validateEmployeeSubmit } from "../../Forms/formsValidation";
import dayjs from "dayjs";

//TODO: Explore why the initialization of the date doesn't work except when it's initialiazed as dayjs() type instead of the correct one (string)

export function employeeButtonsLogic(
  action: actionsEmp,
  lstEmployees: Employee[],
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>,
  setAction: React.Dispatch<React.SetStateAction<actionsEmp>>,
  employeeSelected: Employee | null,
  setSelectEmployee: React.Dispatch<React.SetStateAction<Employee | null>>
) {
  // For error handling
  const [errorMessage, setError] = useState<string>("");
  const [errorNumber, setErrorNumber] = useState<number>(0);

  // Form values state
  const [formsValues, setFormValues] = useState<formsValues>({
    name: "",
    date: "",
    role: "None",
    team: "Not Defined",
  });

  // Update form values when action changes
  useEffect(() => {
    if (action === "Edit" && employeeSelected) {
      setFormValues({
        name: employeeSelected.name,
        date: employeeSelected.date,
        role: employeeSelected.role,
        team: employeeSelected.team,
      });
    }

    if (action === "Add") {
      setFormValues({
        name: "",
        date: dayjs(),
        role: "None",
        team: "Not Defined",
      });
    }
    // Clear errors when dialog opens
    setError("");
    setErrorNumber(0);
  }, [action, employeeSelected]);

  // Handler for individual field changes
  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  // Handler for adding an employee
  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateEmployeeSubmit(formsValues, lstEmployees);

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
      setAction(null);
    } else {
      setErrorNumber(errorNumber + 1);
      setError(validation.error);
    }
  };

  // Handler for editing an employee
  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (employeeSelected) {
      const validation = validateEmployeeSubmit(
        formsValues,
        lstEmployees,
        employeeSelected.name
      );

      if (validation.isValid) {
        setEmployees((prev) => {
          return prev.map((employee) =>
            employee.name.trim().toUpperCase() ===
            employeeSelected.name.trim().toUpperCase()
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
        setAction(null);
        setSelectEmployee(null);
      } else {
        setErrorNumber(errorNumber + 1);
        setError(validation.error);
      }
    }
  };

  // Handler for deleting an employee
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
