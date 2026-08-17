import { create } from "zustand";
import type { IncomeModel } from "@repo/models";

export type IncomeFormMode = "create" | "edit";

interface IncomeState {
  isFormDialogOpen: boolean;
  formMode: IncomeFormMode;
  selectedIncome: IncomeModel | null;
  isDeleteDialogOpen: boolean;
  openCreateDialog: () => void;
  openEditDialog: (income: IncomeModel) => void;
  closeFormDialog: () => void;
  openDeleteDialog: (income: IncomeModel) => void;
  closeDeleteDialog: () => void;
}

export const useIncomeStore = create<IncomeState>((set) => ({
  isFormDialogOpen: false,
  formMode: "create",
  selectedIncome: null,
  isDeleteDialogOpen: false,
  openCreateDialog: () =>
    set({ isFormDialogOpen: true, formMode: "create", selectedIncome: null }),
  openEditDialog: (income) =>
    set({ isFormDialogOpen: true, formMode: "edit", selectedIncome: income }),
  closeFormDialog: () => set({ isFormDialogOpen: false }),
  openDeleteDialog: (income) =>
    set({ isDeleteDialogOpen: true, selectedIncome: income }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false }),
}));
