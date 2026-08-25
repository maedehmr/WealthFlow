import { create } from "zustand";
import { DebtItemModel } from "@/features/debts/model/debtModel";

export type DebtFormMode = "create" | "edit";

interface DebtState {
  isFormDialogOpen: boolean;
  formMode: DebtFormMode;
  selectedDebt: DebtItemModel | null;
  isDeleteDialogOpen: boolean;
  openCreateDialog: () => void;
  openEditDialog: (debt: DebtItemModel) => void;
  closeFormDialog: () => void;
  openDeleteDialog: (debt: DebtItemModel) => void;
  closeDeleteDialog: () => void;
}

export const useDebtStore = create<DebtState>((set) => ({
  isFormDialogOpen: false,
  formMode: "create",
  selectedDebt: null,
  isDeleteDialogOpen: false,
  openCreateDialog: () =>
    set({
      isFormDialogOpen: true,
      formMode: "create",
      selectedDebt: null,
    }),
  openEditDialog: (debt) =>
    set({
      isFormDialogOpen: true,
      formMode: "edit",
      selectedDebt: debt,
    }),
  closeFormDialog: () => set({ isFormDialogOpen: false }),
  openDeleteDialog: (debt) =>
    set({ isDeleteDialogOpen: true, selectedDebt: debt }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false }),
}));
