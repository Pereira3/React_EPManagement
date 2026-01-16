import { create } from "zustand";

type actions = "None" | "Add" | "Edit" | "Delete";

interface DialogTypes {
  assignment: boolean;
  setAssignment: (assignment:boolean) => void;
  action: actions;
  setAction: (action: actions) => void;
};

export const useDialogContext = create<DialogTypes>((set) => ({
  assignment: false,
  action: "None",
  setAssignment: (assignment) => set({ assignment }),
  setAction: (action: actions) => set({ action }),
}));