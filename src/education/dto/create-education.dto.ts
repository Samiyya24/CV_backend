import { ApiProperty } from '@nestjs/swagger';

export class CreateEducationDto {
  @ApiProperty({ description: 'The year of education completion' })
  year: string;

  @ApiProperty({ description: 'The place where education was completed' })
  place: string;

  @ApiProperty({ description: 'The degree obtained' })
  degree: string;

  @ApiProperty({ description: 'The institution where education was completed' })
  institution: string;

  @ApiProperty({
    description: 'The ID of the resume associated with this education entry',
  })
  resumeId: number;
}
