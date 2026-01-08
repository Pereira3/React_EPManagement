"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { formsValues } from "@/app/shared/types";
import { FormsContextTypes } from "@/app/context/Types-Data/types";
import dayjs from "dayjs";

// Create the context
const FormsContext = createContext<FormsContextTypes | undefined>(undefined);

// Provider component
export function FormsContextProvider({ children }: { children: ReactNode }) {
  const [formsValues, setFormValues] = useState<formsValues>({
    name: "",
    date: dayjs().format("DD-MM-YYYY"),
    role: "None",
    team: "Not Defined",
  });

  return (
    <FormsContext.Provider
      value={{
        formsValues,
        setFormValues,
      }}
    >
      {children}
    </FormsContext.Provider>
  );
}

// Custom hook to use the context
export function useFormsContext() {
  const context = useContext(FormsContext);
  if (context === undefined) {
    throw new Error("useFormsContext must be used within a FormsContextProvider.");
  }
  return context;
}
