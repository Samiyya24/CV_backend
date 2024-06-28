import { ApiProperty } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty({ description: 'The job title' })
  jobTitle: string;

  @ApiProperty({ description: 'The company name' })
  company: string;

  @ApiProperty({ description: 'The start date of the experience' })
  startDate: string;

  @ApiProperty({
    description: 'The end date of the experience',
    required: false,
  })
  endDate: string;

  @ApiProperty({
    description: 'Description of the experience',
    required: false,
  })
  description: string;

  @ApiProperty({
    description: 'The ID of the resume associated with this experience',
  })
  resumeId: number;
}
