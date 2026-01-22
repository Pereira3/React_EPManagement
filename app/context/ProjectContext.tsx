// For avoiding storage to be deleted when reloading the page, we can use zustand with persist middleware, just remove the comments bellow
// This saves the data on the local browser storage
import { create } from "zustand";
//import { persist, createJSONStorage } from "zustand/middleware";
import { Employee } from "./EmployeeContext";
import { initialProjects } from "./data/initialData";

export type Project = {
  name: string;
  employees?: { emp: Employee; allocation: number }[];
};

interface ProjectTypes {
  lstofProjects: Project[];
  setProjects: (lstofProjects: Project[]) => void;
  selectedProject: Project | null;
  setSelectedProject: (selectedProject: Project | null) => void;
  orderBy: "asc" | "desc";
  setOrderBy: (orderBy: "asc" | "desc") => void;
  pages: number;
  setPages: (pages: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const useProjectContext = create<ProjectTypes>()(
  //persist(
  (set) => ({
    lstofProjects: initialProjects,
    setProjects: (lstofProjects) => set({ lstofProjects }),
    selectedProject: null,
    setSelectedProject: (selectedProject) => set({ selectedProject }),
    orderBy: "asc",
    setOrderBy: (orderBy) => set({ orderBy }),
    pages: 0,
    setPages: (pages) => set({ pages }),
    rowsPerPage: 5,
    setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),
    searchTerm: "",
    setSearchTerm: (searchTerm) => set({ searchTerm }),
  })
  /*{
      name: "employee-storage", // localStorage key
      storage: createJSONStorage(() => localStorage), // can use sessionStorage too
    }
  )*/
);
