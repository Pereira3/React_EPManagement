import { actions, Employee, formsValues, Project } from "../../shared/types";

export type WebContextTypes = {
  assignment: boolean;
  setAssignment: React.Dispatch<React.SetStateAction<boolean>>;
  action: actions;
  setAction: React.Dispatch<React.SetStateAction<actions>>;
  formsValues: formsValues;
  setFormValues: React.Dispatch<React.SetStateAction<formsValues>>;
  errorMessage: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  errorNumber: number;
  setErrorNumber: React.Dispatch<React.SetStateAction<number>>;
  orderBy: "asc" | "desc";
  setOrderBy: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
};

export type EmployeeContextTypes = {
  lstofEmployees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  selectedEmployee: Employee | null;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
  orderSection: string;
  setOrderSection: React.Dispatch<React.SetStateAction<string>>;
};

export type ProjectContextTypes = {
  lstofProjects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
};
