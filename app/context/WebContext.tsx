"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { actions, formsValues } from "@/app/shared/types";
import { WebContextTypes } from "@/app/context/Types-Data/types";
import dayjs from "dayjs";

// Create the context
const WebContext = createContext<WebContextTypes | undefined>(undefined);

// Provider component
export function WebContextProvider({ children }: { children: ReactNode }) {
  const [assignment, setAssignment] = useState<boolean>(false);
  const [action, setAction] = useState<actions>("None");
  const [errorMessage, setError] = useState<string>("");
  const [errorNumber, setErrorNumber] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
  const [formsValues, setFormValues] = useState<formsValues>({
    name: "",
    date: dayjs().format("DD-MM-YYYY"),
    role: "None",
    team: "Not Defined",
  });

  return (
    <WebContext.Provider
      value={{
        assignment,
        setAssignment,
        action,
        setAction,
        formsValues,
        setFormValues,
        errorMessage,
        setError,
        errorNumber,
        setErrorNumber,
        orderBy,
        setOrderBy,
      }}
    >
      {children}
    </WebContext.Provider>
  );
}

// Custom hook to use the context
export function useWebContext() {
  const context = useContext(WebContext);
  if (context === undefined) {
    throw new Error("useWebContext must be used within a WebContextProvider.");
  }
  return context;
}
