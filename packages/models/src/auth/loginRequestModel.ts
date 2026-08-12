import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginRequestModel {
  @IsEmail({}, { message: "ایمیل معتبر نیست" })
  email!: string;

  @IsString({ message: "رمز عبور باید متن باشد" })
  @IsNotEmpty({ message: "رمز عبور الزامی است" })
  @MinLength(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" })
  password!: string;
}
