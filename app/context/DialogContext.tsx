"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { actions } from "@/app/shared/types";
import { DialogContextTypes } from "@/app/context/Types-Data/types";

// Create the context
const DialogContext = createContext<DialogContextTypes | undefined>(undefined);

// Provider component
export function DialogContextProvider({ children }: { children: ReactNode }) {
  const [assignment, setAssignment] = useState<boolean>(false);
  const [action, setAction] = useState<actions>("None");

  return (
    <DialogContext.Provider
      value={{
        assignment,
        setAssignment,
        action,
        setAction,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

// Custom hook to use the context
export function useDialogContext() {
  const context = useContext(DialogContext);
  if (context === undefined) {
    throw new Error("useDialogContext must be used within a DialogContextProvider.");
  }
  return context;
}
