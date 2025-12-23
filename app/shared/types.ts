// ---------- TYPES ----------
export type dataType = "Employees" | "Projects";
export type actions = "Add" | "Edit" | "Delete" | "None";
export type formTypes = string | number;

// ---------- CONTEXT DATA ----------
export type SettersType = {
  lstofEmployees: Employee[];
  lstofProjects: Project[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  selectedEmployee: Employee | null;
  setSelectedEmployee: React.Dispatch<React.SetStateAction<Employee | null>>;
  assignment: boolean;
  setAssignment: React.Dispatch<React.SetStateAction<boolean>>;
  action: actions;
  setAction: React.Dispatch<React.SetStateAction<actions>>;
  formsValues: formsValues;
  setFormValues: React.Dispatch<React.SetStateAction<formsValues>>;
};

// ---------- OBJECTS ----------
export type formsValues = {
  name: string;
  date: string;
  role: string;
  team: string;
  employees?: { emp: Employee; allocation: number }[];
};

export type Employee = {
  name: string;
  date: string;
  role: string;
  team: string;
};

export type Project = {
  name: string;
  employees?: { emp: Employee; allocation: number }[];
};
