import { create } from "zustand";

interface ErrorTypes {
  errorMessage: string;
  setError: (errorMessage: string) => void;
  errorNumber: number;
  setErrorNumber: (errorNumber: number) => void;
};

export const useErrorContext = create<ErrorTypes>((set) => ({
  errorMessage: "",
  errorNumber: 0,
  setError: (errorMessage) => set({ errorMessage }),
  setErrorNumber: (errorNumber) => set({ errorNumber }),
}));
