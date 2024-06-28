import { ApiProperty } from '@nestjs/swagger';

export class CreateInterestDto {
  @ApiProperty({ description: 'The name of the interest' })
  name: string;

  @ApiProperty({
    description: 'The ID of the resume associated with this interest',
  })
  resumeId: number;
}
