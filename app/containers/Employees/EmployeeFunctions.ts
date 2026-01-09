import { useEmployeeContext } from "@/app/context/EmployeeContext";
import { useProjectContext } from "@/app/context/ProjectContext";
import { Employee, Project } from "@/app/shared/types";
import { normalizedString } from "@/app/shared/utils";
import { useMemo } from "react";

/* 
Returns an array of projects where the employee is allocated
along with their allocation percentage
*/
export function useGetterEmployeeProjects(): {
  project: Project;
  allocation: number;
}[] {
  const { lstofProjects } = useProjectContext();
  const { selectedEmployee } = useEmployeeContext();

  return useMemo(() => {
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
  }, [lstofProjects, selectedEmployee]);
}

/* 
Returns the list of sorted Employees based on the orderBy value (asc or desc)
Sort function expects a number so localeCompare is needed
*/
export function useSortedlstofEmployees(): Employee[] {
  const { lstofEmployees, orderSection, orderBy } = useEmployeeContext();

  return useMemo(() => {
    if (!orderSection) return lstofEmployees;
    return [...lstofEmployees].toSorted((a, b) => {
      let valueA: string | number;
      let valueB: string | number;

      if (orderSection === "date") {
        const [dayA, monthA, yearA] = a.date.split("-");
        const [dayB, monthB, yearB] = b.date.split("-");
        valueA = new Date(`${yearA}-${monthA}-${dayA}`).getTime();
        valueB = new Date(`${yearB}-${monthB}-${dayB}`).getTime();
        return orderBy === "asc" ? valueA - valueB : valueB - valueA;
      } else {
        valueA = normalizedString(a[orderSection as keyof Employee] as string);
        valueB = normalizedString(b[orderSection as keyof Employee] as string);

        return orderBy === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    });
  }, [lstofEmployees, orderBy, orderSection]);
}
