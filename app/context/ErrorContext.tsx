"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { ErrorContextTypes } from "@/app/context/Types-Data/types";

// Create the context
const ErrorContext = createContext<ErrorContextTypes | undefined>(undefined);

// Provider component
export function ErrorContextProvider({ children }: { children: ReactNode }) {
  const [errorMessage, setError] = useState<string>("");
  const [errorNumber, setErrorNumber] = useState<number>(0);

  return (
    <ErrorContext.Provider
      value={{
        errorMessage,
        setError,
        errorNumber,
        setErrorNumber,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

// Custom hook to use the context
export function useErrorContext() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error("useErrorContext must be used within a ErrorContextProvider.");
  }
  return context;
}
