// ---------- TYPES ----------
export type actions = "Add" | "Edit" | "Delete" | "None";
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
