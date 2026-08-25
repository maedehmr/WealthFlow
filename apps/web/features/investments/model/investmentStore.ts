import { create } from "zustand";
import { InvestmentItemModel } from "@/features/investments/model/investmentModel";

export type InvestmentFormMode = "create" | "edit";

interface InvestmentState {
  isFormDialogOpen: boolean;
  formMode: InvestmentFormMode;
  selectedInvestment: InvestmentItemModel | null;
  isDeleteDialogOpen: boolean;
  openCreateDialog: () => void;
  openEditDialog: (investment: InvestmentItemModel) => void;
  closeFormDialog: () => void;
  openDeleteDialog: (investment: InvestmentItemModel) => void;
  closeDeleteDialog: () => void;
}

export const useInvestmentStore = create<InvestmentState>((set) => ({
  isFormDialogOpen: false,
  formMode: "create",
  selectedInvestment: null,
  isDeleteDialogOpen: false,
  openCreateDialog: () =>
    set({
      isFormDialogOpen: true,
      formMode: "create",
      selectedInvestment: null,
    }),
  openEditDialog: (investment) =>
    set({
      isFormDialogOpen: true,
      formMode: "edit",
      selectedInvestment: investment,
    }),
  closeFormDialog: () => set({ isFormDialogOpen: false }),
  openDeleteDialog: (investment) =>
    set({ isDeleteDialogOpen: true, selectedInvestment: investment }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false }),
}));
