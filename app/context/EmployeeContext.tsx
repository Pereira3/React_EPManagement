// For avoiding storage to be deleted when reloading the page, we can use zustand with persist middleware, just remove the comments bellow
// This saves the data on the local browser storage
import { create } from "zustand";
//import { persist, createJSONStorage } from "zustand/middleware";
import { initialEmployees } from "./data/initialData";

export type Employee = {
  name: string;
  date: string;
  role: string;
  team: string;
};

interface EmployeeTypes {
  lstofEmployees: Employee[];
  setEmployees: (lstofEmployees: Employee[]) => void;
  selectedEmployee: Employee | null;
  setSelectedEmployee: (selectedEmployee: Employee | null) => void;
  orderSection: string;
  setOrderSection: (orderSection: string) => void;
  orderBy: "asc" | "desc";
  setOrderBy: (orderBy: "asc" | "desc") => void;
}

export const useEmployeeContext = create<EmployeeTypes>()(
  //persist(
  (set) => ({
    lstofEmployees: initialEmployees,
    selectedEmployee: null,
    orderSection: "",
    orderBy: "asc",
    setEmployees: (lstofEmployees) => set({ lstofEmployees }),
    setSelectedEmployee: (selectedEmployee) => set({ selectedEmployee }),
    setOrderSection: (orderSection) => set({ orderSection }),
    setOrderBy: (orderBy) => set({ orderBy }),
  })
  /*{
      name: "employee-storage", // localStorage key
      storage: createJSONStorage(() => localStorage), // can use sessionStorage too
    }
  )*/
);
