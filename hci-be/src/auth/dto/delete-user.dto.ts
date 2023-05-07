import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDeleteUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  otp: string;
}
