// ---------- IMPORTS ----------
import { useState } from "react";
// Importing Validation Functions
import {
  validateProjectSubmit,
  validateConnectionSubmit,
} from "../../components/Forms/formsValidation";
// Importing Contexts
import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { Project, useProjectContext } from "@/app/context/ProjectContext";
import { useDialogContext } from "@/app/context/DialogContext";
import { useErrorContext } from "@/app/context/ErrorContext";
import { normalizedString } from "@/app/shared/utils";

export function useProjectsLogic() {
  const { setAction } = useDialogContext();
  const {
    lstofProjects,
    setProjects,
    selectedProject,
    setSelectedProject,
    orderBy,
  } = useProjectContext();

  const { lstofEmployees, selectedEmployee } = useEmployeeContext();

  // For error handling
  const { errorMessage, setError, errorNumber, setErrorNumber } =
    useErrorContext();
  const [projectName, setProjectName] = useState("");

  function handleChange(name: string) {
    setProjectName(name);
  }

  function clearSelectionsAndErrors() {
    setError("");
    setAction("None");
    setErrorNumber(0);
    setProjectName("");
    setSelectedProject(null);
  }

  // ---------- Handler for the addition of a project ----------
  function handleAddSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validation = validateProjectSubmit(lstofProjects, projectName);

    // Check for duplicates
    if (validation.isValid) {
      const newProject: Project = {
        name: projectName,
      };
      setProjects([...lstofProjects, newProject]);
      clearSelectionsAndErrors();
    } else {
      setErrorNumber(errorNumber + 1);
      setError(validation.error);
    }
  }

  // ---------- Handler for the deletion of a project ----------
  function handleDelete() {
    if (selectedProject) {
      const updatedProjects = lstofProjects.filter(
        (project) =>
          normalizedString(project.name) !==
          normalizedString(selectedProject.name)
      );
      setProjects(updatedProjects);
      clearSelectionsAndErrors();
    }
  }

  /* 
Returns the list of sorted Projects based on the orderBy value (asc or desc)
Sort function expects a number so localeCompare is needed
*/
  function useSortedlstofProjects(): Project[] {

    if (!orderBy) return lstofProjects;
    return [...lstofProjects].toSorted((a, b) => {
      const valueA = normalizedString(a.name);
      const valueB = normalizedString(b.name);

      return orderBy === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }

  /* 
Returns an array of employee names that are not assigned to the project
after filtering the whole employee list to only include that specific employees
*/
  function useGetterProjectEmployeesList(): string[] {

    if (!selectedProject) return [];

    const validEmployeeDropdown = lstofEmployees?.filter(
      (emp) =>
        !selectedProject.employees?.some(
          (pe) => normalizedString(pe.emp.name) === normalizedString(emp.name)
        )
    );

    return validEmployeeDropdown?.map((emp) => emp.name) || [];
  }

  function detachEmployee() {
    if (selectedProject && selectedEmployee) {
      const updatedEmployees = lstofProjects.map((project) =>
        normalizedString(project.name) ===
          normalizedString(selectedProject.name) ?
          {
            ...project,
            employees: project.employees?.filter(
              (e) =>  normalizedString(e.emp.name) !== normalizedString(selectedEmployee.name)
            ),
          } :
          project
      );
      setProjects(updatedEmployees);
    }
  }

  function handleAttachEmployee(
    newEmployeeName: string,
    newAllocation: number
  ): void {
    const employee = lstofEmployees.find((e) => e.name === newEmployeeName);

    if (!employee) {
      setError("Employee not found.");
      setErrorNumber(errorNumber + 1);
      return;
    }

    if (!selectedProject) {
      setError("Project not selected.");
      setErrorNumber(errorNumber + 1);
      return;
    }

    const validConnection = validateConnectionSubmit(
      selectedProject,
      employee,
      lstofProjects,
      newAllocation
    );

    if (validConnection.isValid) {
      const updateEmployeesAttached = lstofProjects.map((project) =>
        normalizedString(project.name) ===
          normalizedString(selectedProject.name) ?
          {
            ...project,
            employees: [
              ...(project.employees || []),
              { emp: employee, allocation: newAllocation }
            ]
          } :
          project
      );
      setProjects(updateEmployeesAttached
      );
      clearSelectionsAndErrors();
    } else {
      setError(validConnection.error);
      setErrorNumber(errorNumber + 1);
    }
  }

  return {
    projectName,
    errorMessage,
    errorNumber,
    handleChange,
    handleAddSubmit,
    handleDelete,
    clearSelectionsAndErrors,
    useSortedlstofProjects,
    useGetterProjectEmployeesList,
    detachEmployee,
    handleAttachEmployee,
  };
}
