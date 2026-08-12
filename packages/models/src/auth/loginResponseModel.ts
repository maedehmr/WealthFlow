import type { UserModel } from "../userModel";

export class LoginResponseModel {
  accessToken!: string;
  user!: UserModel;
}
