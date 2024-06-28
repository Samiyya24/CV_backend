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
export class Education {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the education entry' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The year of education completion' })
  year: string;

  @Column()
  @ApiProperty({ description: 'The place where education was completed' })
  place: string;

  @Column()
  @ApiProperty({ description: 'The degree obtained' })
  degree: string;

  @Column()
  @ApiProperty({ description: 'The institution where education was completed' })
  institution: string;

  @ManyToOne(() => Resume, (resume) => resume.education)
  @ApiProperty({
    description: 'The resume associated with this education entry',
  })
  resume: Resume;

  @Column()
  @ApiProperty({
    description: 'The ID of the resume associated with this education entry',
  })
  resumeId: number;

  @CreateDateColumn()
  @ApiProperty({
    description: 'The date and time when the education entry was created',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'The date and time when the education entry was last updated',
  })
  updatedAt: Date;
}
