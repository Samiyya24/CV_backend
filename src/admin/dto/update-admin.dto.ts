import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  first_name?: string;
  last_name?: string;
  age?: number;
  email?: string;
  phone_number?: string;
  addres?: string;
  gender?: string;
  is_active?: boolean;
}
