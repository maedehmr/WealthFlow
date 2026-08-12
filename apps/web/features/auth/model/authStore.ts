import { create } from "zustand";
import { AuthUserModel } from "@/features/auth/model/authModel";

interface AuthState {
  user: AuthUserModel | null;
  setUser: (user: AuthUserModel | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
