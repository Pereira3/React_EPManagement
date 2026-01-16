// ---------- IMPORTS ----------
import { useEffect } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
// Importing Validation Functions
import { validateEmployeeSubmit } from "../../components/Forms/formsValidation";
// Importing Contexts
import { Employee, useEmployeeContext } from "@/app/context/EmployeeContext";
import { Project, useProjectContext } from "@/app/context/ProjectContext";
import { useDialogContext } from "@/app/context/DialogContext";
import { useFormsContext } from "@/app/context/FormsContext";
import { useErrorContext } from "@/app/context/ErrorContext";
import { normalizedString } from "@/app/shared/utils";
dayjs.extend(customParseFormat);

export function useEmployeesLogic() {
  const { action, setAction } = useDialogContext();
  const { formsValues, setFormValues } = useFormsContext();
  const { errorMessage, setError, errorNumber, setErrorNumber } =
    useErrorContext();
  const {
    orderSection,
    orderBy,
    lstofEmployees,
    setEmployees,
    selectedEmployee,
    setSelectedEmployee,
  } = useEmployeeContext();
  const { lstofProjects, setProjects } = useProjectContext();

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
  function handleChange(field: string, value: string) {
    setFormValues({ ...formsValues, [field]: value });
  }

  // Clear selections and errors
  function clearSelectionsAndErrors() {
    setError("");
    setAction("None");
    setErrorNumber(0);
    setSelectedEmployee(null);
  }

  // Handler for adding an employee
  // Default value was type date, which would flag an error, for that reason the validation of type was necessary
  function handleAddSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validateEmployeeSubmit(formsValues, lstofEmployees);
    if (validation.isValid) {
      const newEmployee: Employee = {
        name: formsValues.name,
        date: formsValues.date,
        role: formsValues.role,
        team: formsValues.team,
      };
      setEmployees([...lstofEmployees, newEmployee]);
      clearSelectionsAndErrors();
    } else {
      setErrorNumber(errorNumber + 1);
      setError(validation.error);
    }
  }

  // Handler for editing an employee
  function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedEmployee) {
      const validation = validateEmployeeSubmit(
        formsValues,
        lstofEmployees,
        selectedEmployee.name
      );

      if (validation.isValid) {
        const updatedEmployees = lstofEmployees.map((employee) =>
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
        setEmployees(updatedEmployees);

        const updatedProjects = lstofProjects.map((project) =>
          project.employees
            ? {
                ...project,
                employees: project.employees.map((proj) =>
                  normalizedString(proj.emp.name) ===
                  normalizedString(selectedEmployee.name)
                    ? {
                        ...proj,
                        emp: { ...proj.emp, name: formsValues.name },
                      }
                    : proj
                ),
              }
            : project
        );
        setProjects(updatedProjects);
        clearSelectionsAndErrors();
      } else {
        setErrorNumber(errorNumber + 1);
        setError(validation.error);
      }
    }
  }

  // Handler for deleting an employee
  function handleDelete() {
    if (selectedEmployee) {
      const filteredEmployees = lstofEmployees.filter(
        (emp) =>
          normalizedString(emp.name) !== normalizedString(selectedEmployee.name)
      );
      setEmployees(filteredEmployees);

      const updatedProjects = lstofProjects.map((project) =>
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
      );
      setProjects(updatedProjects);

      clearSelectionsAndErrors();
    }
  }

  /* 
Returns an array of projects where the employee is allocated
along with their allocation percentage
*/
  function useGetterEmployeeProjects(): {
    project: Project;
    allocation: number;
  }[] {
    if (!selectedEmployee) return [];

    return lstofProjects
      .map((project) => {
        const allocation = project.employees?.find(
          (e) =>
            normalizedString(e.emp.name) ===
            normalizedString(selectedEmployee.name)
        );
        return allocation
          ? { project, allocation: allocation.allocation }
          : null;
      })
      .filter((item) => item !== null) as {
      project: Project;
      allocation: number;
    }[];
  }

  /* 
Returns the list of sorted Employees based on the orderBy value (asc or desc)
Sort function expects a number so localeCompare is needed
*/
  function useSortedlstofEmployees(): Employee[] {
    if (!orderSection) return lstofEmployees;
    return [...lstofEmployees].toSorted((a, b) => {
      let valueA: string | number;
      let valueB: string | number;

      if (orderSection === "date") {
        valueA = dayjs(a.date, "DD-MM-YYYY").valueOf();
        valueB = dayjs(b.date, "DD-MM-YYYY").valueOf();
        return orderBy === "asc" ? valueA - valueB : valueB - valueA;
      } else {
        valueA = normalizedString(
          a[orderSection as keyof Employee] as string
        );
        valueB = normalizedString(
          b[orderSection as keyof Employee] as string
        );

        return orderBy === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    });
  }

  return {
    formsValues,
    errorMessage,
    errorNumber,
    handleChange,
    handleAddSubmit,
    handleEditSubmit,
    handleDelete,
    clearSelectionsAndErrors,
    useGetterEmployeeProjects,
    useSortedlstofEmployees,
  };
}
