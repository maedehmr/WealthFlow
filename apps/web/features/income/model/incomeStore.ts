import { create } from "zustand";
import { IncomeItemModel } from "@/features/income/model/incomeModel";

export type IncomeFormMode = "create" | "edit";

interface IncomeState {
  isFormDialogOpen: boolean;
  formMode: IncomeFormMode;
  selectedIncome: IncomeItemModel | null;
  isDeleteDialogOpen: boolean;
  openCreateDialog: () => void;
  openEditDialog: (income: IncomeItemModel) => void;
  closeFormDialog: () => void;
  openDeleteDialog: (income: IncomeItemModel) => void;
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
