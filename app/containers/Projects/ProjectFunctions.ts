import { Employee, Project } from "@/app/shared/types";
import { validateConnectionSubmit } from "../../components/Forms/formsValidation";

import { normalizedString } from "@/app/shared/utils";

/* 
Returns the list of sorted Projects based on the orderBy value (asc or desc)
Sort function expects a number so localeCompare is needed
*/
export function sortedlstofProjects(
  lstofProjects: Project[],
  orderBy: "asc" | "desc" | null
): Project[] {
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
export function getProjectEmployeesList(
  listEmployees: Employee[],
  project: Project
): string[] {
  const validEmployeeDropdown = listEmployees?.filter(
    (emp) =>
      !project.employees?.some(
        (pe) => normalizedString(pe.emp.name) === normalizedString(emp.name)
      )
  );

  return validEmployeeDropdown?.map((emp) => emp.name);
}

export function detachEmployee(
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
  project: Project,
  employee: { emp: Employee; allocation: number }
) {
  setProjects((prev) =>
    prev.map((p) =>
      normalizedString(p.name) === normalizedString(project.name)
        ? {
            ...p,
            employees: p.employees?.filter(
              (e) =>
                normalizedString(e.emp.name) !==
                normalizedString(employee.emp.name)
            ),
          }
        : p
    )
  );
}

export function handleAttachEmployee(
  newEmployeeName: string,
  newAllocation: number,
  lstofEmployees: Employee[],
  lstofProjects: Project[],
  selectedProject: Project,
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
  setAssignment: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setErrorNumber: React.Dispatch<React.SetStateAction<number>>,
  errorNumber: number
): void {
  const employee = lstofEmployees.find((e) => e.name === newEmployeeName);
  if (!employee) return;

  const validConnection = validateConnectionSubmit(
    selectedProject,
    employee,
    lstofProjects,
    newAllocation
  );

  if (validConnection.isValid) {
    setProjects((prev) =>
      prev.map((project) =>
        normalizedString(project.name) ===
        normalizedString(selectedProject.name)
          ? {
              ...project,
              employees: [
                ...(project.employees || []),
                { emp: employee, allocation: newAllocation },
              ],
            }
          : project
      )
    );
    setAssignment(false);
    setError("");
    setErrorNumber(0);
  } else {
    setErrorNumber(errorNumber + 1);
    setError(validConnection.error);
  }
}
