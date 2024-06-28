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
export class Language {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the language' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the language' })
  name: string;

  @Column()
  @ApiProperty({
    description:
      'The proficiency level in the language (e.g., beginner, intermediate, advanced)',
  })
  proficiency: string;

  @ManyToOne(() => Resume, (resume) => resume.language)
  @ApiProperty({ description: 'The resume associated with this language' })
  resume: Resume;

  @Column()
  @ApiProperty({
    description: 'The ID of the resume associated with this language',
  })
  resumeId: number;

  @CreateDateColumn()
  @ApiProperty({
    description: 'The date and time when the language entry was created',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'The date and time when the language entry was last updated',
  })
  updatedAt: Date;
}
