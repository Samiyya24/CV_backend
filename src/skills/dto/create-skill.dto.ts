import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({ description: 'The name of the skill' })
  name: string;

  @ApiProperty({
    description:
      'The level of proficiency in the skill (e.g., beginner, intermediate, advanced)',
  })
  level: string;

  @ApiProperty({
    description: 'The ID of the resume associated with this skill',
  })
  resumeId: number;
}
