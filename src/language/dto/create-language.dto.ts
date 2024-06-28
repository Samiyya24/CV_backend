import { ApiProperty } from '@nestjs/swagger';

export class CreateLanguageDto {
  @ApiProperty({ example: 'English', description: 'The name of the language' })
  name: string;

  @ApiProperty({
    example: 'Advanced',
    description: 'The proficiency level in the language',
  })
  proficiency: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the resume associated with this language',
  })
  resumeId: number;
}
