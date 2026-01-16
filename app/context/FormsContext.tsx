import { create } from "zustand";
import { Employee } from "./EmployeeContext";

export type formsValues = {
  name: string;
  date: string;
  role: string;
  team: string;
  employees?: { emp: Employee; allocation: number }[];
};

interface FormsTypes {
  formsValues: formsValues;
  setFormValues: (formsValues: formsValues) => void;
};

export const useFormsContext = create<FormsTypes>((set) => ({
  formsValues: { name: "", date: "", role: "", team: "" },
  setFormValues: (formsValues) => set({ formsValues }),
}));