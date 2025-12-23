import { Employee, Project } from "@/app/shared/types";

/* 
Returns an array of projects where the employee is allocated
along with their allocation percentage
*/
export function getEmployeeProjects(
  lstofProjects: Project[],
  selectedEmployee: Employee
): { project: Project; allocation: number }[] {
  return lstofProjects
    .map((project) => {
      const allocation = project.employees?.find(
        (e) =>
          e.emp.name.trim().toUpperCase() ===
          selectedEmployee.name.trim().toUpperCase()
      );
      return allocation ? { project, allocation: allocation.allocation } : null;
    })
    .filter((item) => item !== null) as {
    project: Project;
    allocation: number;
  }[];
}
