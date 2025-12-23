import { Employee, Project } from "@/app/shared/types";
import { validateConnectionSubmit } from "../../components/Forms/formsValidation";

/* 
Returns an array of employee names that are not assigned to the project
after filtering the whole employee list to only include that specific employees
*/
export function getProjectEmployeesList(
  listEmployees: Employee[],
  project: Project
): string[] {
  const validEmployeeDropdown = listEmployees?.filter(
    (emp) => !project.employees?.some((pe) => pe.emp.name === emp.name)
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
      p.name.trim().toUpperCase() === project.name.trim().toUpperCase()
        ? {
            ...p,
            employees: p.employees?.filter(
              (e) =>
                e.emp.name.trim().toUpperCase() !==
                employee.emp.name.trim().toUpperCase()
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
        project.name.trim().toUpperCase() ===
        selectedProject.name.trim().toUpperCase()
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
