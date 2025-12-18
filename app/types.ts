export type dataType = "Employees" | "Projects";
export type actionsEmp = "Add" | "Edit" | "Delete" | null;
export type actionsProj = "Add" | "Delete" | null;

// ---------- OBJECTS ----------
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