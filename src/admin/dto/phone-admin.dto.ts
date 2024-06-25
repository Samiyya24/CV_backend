
import { IsPhoneNumber } from 'class-validator';

export class PhoneAdminDto{
  @IsPhoneNumber("UZ")
    phone:string
}
