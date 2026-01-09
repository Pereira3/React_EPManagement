import { useMemo } from "react";

import { Employee, Project } from "@/app/shared/types";
import { validateConnectionSubmit } from "../../components/Forms/formsValidation";

import { normalizedString } from "@/app/shared/utils";
import { useProjectContext } from "@/app/context/ProjectContext";
import { useEmployeeContext } from "@/app/context/EmployeeContext";

/* 
Returns the list of sorted Projects based on the orderBy value (asc or desc)
Sort function expects a number so localeCompare is needed
*/
export function useSortedlstofProjects(): Project[] {
  const { lstofProjects, orderBy } = useProjectContext();

  return useMemo(() => {
    if (!orderBy) return lstofProjects;
    return [...lstofProjects].toSorted((a, b) => {
      const valueA = normalizedString(a.name);
      const valueB = normalizedString(b.name);

      return orderBy === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }, [lstofProjects, orderBy]);
}

/* 
Returns an array of employee names that are not assigned to the project
after filtering the whole employee list to only include that specific employees
*/
export function useGetterProjectEmployeesList(): string[] {
  const { lstofEmployees } = useEmployeeContext();
  const { selectedProject } = useProjectContext();

  const validEmployeeDropdown = lstofEmployees?.filter(
    (emp) =>
      !selectedProject!.employees?.some(
        (pe) => normalizedString(pe.emp.name) === normalizedString(emp.name)
      )
  );

  return validEmployeeDropdown?.map((emp) => emp.name);
}

export function detachEmployee(
  employee: { emp: Employee; allocation: number },
  selectedProject: Project,
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>
) {
  setProjects((prev) =>
    prev.map((p) =>
      normalizedString(p.name) === normalizedString(selectedProject.name)
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
  setAssignment: (value: boolean) => void,
  setError: (value: string) => void,
  setErrorNumber: (value: number) => void,
  errorNumber: number
): void {
  const employee = lstofEmployees.find((e) => e.name === newEmployeeName);
  const validConnection = validateConnectionSubmit(
    selectedProject,
    employee!,
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
                { emp: employee!, allocation: newAllocation },
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
