import { create } from "zustand";
import { ExpenseItemModel } from "@/features/expenses/model/expenseModel";

export type ExpenseFormMode = "create" | "edit";

interface ExpenseState {
  isFormDialogOpen: boolean;
  formMode: ExpenseFormMode;
  selectedExpense: ExpenseItemModel | null;
  isDeleteDialogOpen: boolean;
  openCreateDialog: () => void;
  openEditDialog: (expense: ExpenseItemModel) => void;
  closeFormDialog: () => void;
  openDeleteDialog: (expense: ExpenseItemModel) => void;
  closeDeleteDialog: () => void;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
  isFormDialogOpen: false,
  formMode: "create",
  selectedExpense: null,
  isDeleteDialogOpen: false,
  openCreateDialog: () =>
    set({
      isFormDialogOpen: true,
      formMode: "create",
      selectedExpense: null,
    }),
  openEditDialog: (expense) =>
    set({
      isFormDialogOpen: true,
      formMode: "edit",
      selectedExpense: expense,
    }),
  closeFormDialog: () => set({ isFormDialogOpen: false }),
  openDeleteDialog: (expense) =>
    set({ isDeleteDialogOpen: true, selectedExpense: expense }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false }),
}));
