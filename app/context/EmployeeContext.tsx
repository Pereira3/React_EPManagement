"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Employee } from "@/app/shared/types";
import { EmployeeContextTypes } from "@/app/context/Types-Data/types";
import { initialEmployees } from "./Types-Data/initialData";

const EmployeeContext = createContext<EmployeeContextTypes | undefined>(
  undefined
);

export function EmployeeContextProvider({ children }: { children: ReactNode }) {
  // Created List of Employees initializated with initialData.ts file
  const [lstofEmployees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [orderSection, setOrderSection] = useState<string>("");

  return (
    <EmployeeContext.Provider
      value={{
        lstofEmployees,
        setEmployees,
        selectedEmployee,
        setSelectedEmployee,
        orderSection,
        setOrderSection,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

// Custom hook to use the context
export function useEmployeeContext() {
  const context = useContext(EmployeeContext);
  if (context === undefined) {
    throw new Error(
      "EmployeeContext must be used within an EmployeeContextProvider."
    );
  }
  return context;
}
