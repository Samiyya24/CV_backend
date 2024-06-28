import { ApiProperty } from '@nestjs/swagger';

export class CreateResumeDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;
}
