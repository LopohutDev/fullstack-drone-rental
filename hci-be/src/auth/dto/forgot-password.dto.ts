import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  otp: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ForgotPasswordInitDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
