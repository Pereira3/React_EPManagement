"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { actions, Employee, Project, SettersType } from "../shared/types";
import { initialEmployees, initialProjects } from "../shared/initialData";
import { formsValues } from "../shared/types";
import dayjs from "dayjs";

// Create the context
const Setters = createContext<SettersType | undefined>(undefined);

// Provider component
export function SettersProvider({ children }: { children: ReactNode }) {
  // Created List of Employees and Projects initializated with initialData.ts file
  const [lstofEmployees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [lstofProjects, setProjects] = useState<Project[]>(initialProjects);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [assignment, setAssignment] = useState<boolean>(false);
  const [action, setAction] = useState<actions>("None");

  // Form values state
  const [formsValues, setFormValues] = useState<formsValues>({
    name: "",
    date: dayjs().format("DD-MM-YYYY"),
    role: "None",
    team: "Not Defined",
  });

  return (
    <Setters.Provider
      value={{
        lstofEmployees,
        lstofProjects,
        setEmployees,
        setProjects,
        selectedProject,
        setSelectedProject,
        selectedEmployee,
        setSelectedEmployee,
        assignment,
        setAssignment,
        action,
        setAction,
        formsValues,
        setFormValues,
      }}
    >
      {children}
    </Setters.Provider>
  );
}

// Custom hook to use the context
export function useSetters() {
  const context = useContext(Setters);
  if (context === undefined) {
    throw new Error("useSetters must be used within an SettersProvider.");
  }
  return context;
}
