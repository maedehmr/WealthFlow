import { create } from "zustand";
import { AssetItemModel } from "@/features/assets/model/assetModel";

export type AssetFormMode = "create" | "edit";

interface AssetState {
  isFormDialogOpen: boolean;
  formMode: AssetFormMode;
  selectedAsset: AssetItemModel | null;
  isDeleteDialogOpen: boolean;
  openCreateDialog: () => void;
  openEditDialog: (asset: AssetItemModel) => void;
  closeFormDialog: () => void;
  openDeleteDialog: (asset: AssetItemModel) => void;
  closeDeleteDialog: () => void;
}

export const useAssetStore = create<AssetState>((set) => ({
  isFormDialogOpen: false,
  formMode: "create",
  selectedAsset: null,
  isDeleteDialogOpen: false,
  openCreateDialog: () =>
    set({
      isFormDialogOpen: true,
      formMode: "create",
      selectedAsset: null,
    }),
  openEditDialog: (asset) =>
    set({
      isFormDialogOpen: true,
      formMode: "edit",
      selectedAsset: asset,
    }),
  closeFormDialog: () => set({ isFormDialogOpen: false }),
  openDeleteDialog: (asset) =>
    set({ isDeleteDialogOpen: true, selectedAsset: asset }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false }),
}));
