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

/* 
Returns the list of sorted Employees based on the orderBy value (asc or desc)
Sort function expects a number so localeCompare is needed
*/
export function sortedlstofEmployees(
  lstofEmployees: Employee[],
  orderSection: string,
  orderBy: "asc" | "desc"
): Employee[] {
  if (orderSection === "name") {
    return [...lstofEmployees].sort((employeeA, employeeB) => {
      const nameA = employeeA.name.trim().toUpperCase();
      const nameB = employeeB.name.trim().toUpperCase();

      if (orderBy === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }

  if (orderSection === "date") {
    return [...lstofEmployees].sort((employeeA, employeeB) => {
      // As Date doesn't understand 'dd-mm-yyyy' format, splitting and rearranging it to 'yyyy-mm-dd' was necessary

      const [dayA, monthA, yearA] = employeeA.date.split("-");
      const [dayB, monthB, yearB] = employeeB.date.split("-");

      const dateA = new Date(`${yearA}-${monthA}-${dayA}`).getTime();
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`).getTime();

      if (orderBy === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
  }

  if (orderSection === "role") {
    return [...lstofEmployees].sort((employeeA, employeeB) => {
      const roleA = employeeA.role.trim().toUpperCase();
      const roleB = employeeB.role.trim().toUpperCase();
      if (orderBy === "asc") {
        return roleA.localeCompare(roleB);
      } else {
        return roleB.localeCompare(roleA);
      }
    });
  }

  if (orderSection === "team") {
    return [...lstofEmployees].sort((employeeA, employeeB) => {
      const teamA = employeeA.team.trim().toUpperCase();
      const teamB = employeeB.team.trim().toUpperCase();
      if (orderBy === "asc") {
        return teamA.localeCompare(teamB);
      } else {
        return teamB.localeCompare(teamA);
      }
    });
  }

  // In case no orderSection is set an unsorted list will be returned
  return lstofEmployees;
}
