import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the experience' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The job title' })
  jobTitle: string;

  @Column()
  @ApiProperty({ description: 'The company name' })
  company: string;

  @Column()
  @ApiProperty({ description: 'The start date of the experience' })
  startDate: string;

  @Column({ nullable: true })
  @ApiProperty({
    description: 'The end date of the experience',
    required: false,
  })
  endDate: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: 'Description of the experience',
    required: false,
  })
  description: string;

  @ManyToOne(() => Resume, (resume) => resume.experience)
  @ApiProperty({ description: 'The resume associated with this experience' })
  resume: Resume;

  @Column()
  @ApiProperty({
    description: 'The ID of the resume associated with this experience',
  })
  resumeId: number;

  @CreateDateColumn()
  @ApiProperty({
    description: 'The date and time when the experience entry was created',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'The date and time when the experience entry was last updated',
  })
  updatedAt: Date;
}
