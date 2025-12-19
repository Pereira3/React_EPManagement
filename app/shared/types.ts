// ---------- TYPES ----------
export type dataType = "Employees" | "Projects";
export type actionsEmp = "Add" | "Edit" | "Delete" | null;
export type actionsProj = "Add" | "Delete" | null;
export type formTypes = string | number;

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
