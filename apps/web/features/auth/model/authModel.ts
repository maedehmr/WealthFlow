import { UserModel } from "@repo/models";

export class AuthUserModel extends UserModel {

  static fromUserModel(user: UserModel): AuthUserModel {
    const authUser = new AuthUserModel();

    authUser.id = user.id;
    authUser.email = user.email;
    authUser.createdAt = user.createdAt;

    return authUser;
  }
}
