import { LoginRequestModel } from "@repo/models";
import { AuthUserModel } from "@/features/auth/model/authModel";
import { authApi } from "@/features/auth/api/authApi";
import { useAuthStore } from "@/features/auth/model/authStore";

export class AuthService {
  public async login(request: LoginRequestModel): Promise<AuthUserModel> {
    const user = await authApi.login(request);
    this.getStore().setUser(user);
    return user;
  }

  public async logout(): Promise<void> {
    await authApi.logout();
    this.getStore().setUser(null);
  }

  public getCurrentUser(): AuthUserModel | null {
    return this.getStore().user;
  }

  private getStore() {
    return useAuthStore.getState();
  }
}

export const authService = new AuthService();
