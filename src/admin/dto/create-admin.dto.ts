import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  age: number;

  @IsString()
  email: string;

  @IsString()
  phone_number: string;

  @IsString()
  addres: string;

  @IsString()
  gender: string;

  @IsString()
  is_active: boolean;

  @IsString()
  password: string;

  @IsString()
  confirm_password: string;

  
}
