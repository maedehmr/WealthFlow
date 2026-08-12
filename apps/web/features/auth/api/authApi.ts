import type { LoginRequestModel, UserModel } from "@repo/models";
import { httpClient } from "@/shared/lib/httpClient";
import { AuthUserModel } from "@/features/auth/model/authModel";

export interface AuthApi {
  login(request: LoginRequestModel): Promise<AuthUserModel>;
  logout(): Promise<void>;
}

class HttpAuthApi implements AuthApi {
  async login(request: LoginRequestModel): Promise<AuthUserModel> {
    const { data } = await httpClient.post<UserModel>("/auth/login", request);
    return AuthUserModel.fromUserModel(data);
  }

  async logout(): Promise<void> {
    await httpClient.post("/auth/logout");
  }
}

export const authApi: AuthApi = new HttpAuthApi();
