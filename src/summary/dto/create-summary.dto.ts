import { ApiProperty } from '@nestjs/swagger';

export class CreateSummaryDto {
  @ApiProperty({
    example: 'A concise summary of skills and experience',
    description: 'The content of the summary',
  })
  content: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the resume associated with this summary',
  })
  resumeId: number;
}
