import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the skill' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the skill' })
  name: string;

  @Column()
  @ApiProperty({
    description:
      'The level of proficiency in the skill (e.g., beginner, intermediate, advanced)',
  })
  level: string;

  @ManyToOne(() => Resume, (resume) => resume.skills)
  resume: Resume;

  @Column()
  @ApiProperty({
    description: 'The ID of the resume associated with this skill',
  })
  resumeId: number;

  @CreateDateColumn()
  @ApiProperty({
    description: 'The date and time when the skill entry was created',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'The date and time when the skill entry was last updated',
  })
  updatedAt: Date;
}
