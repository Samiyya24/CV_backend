import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Summary {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the summary' })
  id: number;

  @Column({ type: 'text' })
  @ApiProperty({ description: 'The content of the summary' })
  content: string;

  @ManyToOne(() => Resume, (resume) => resume.summary)
  @JoinColumn()
  @ApiProperty({ description: 'The resume associated with this summary' })
  resume: Resume;

  @Column()
  @ApiProperty({
    description: 'The ID of the resume associated with this summary',
  })
  resumeId: number;

  @CreateDateColumn()
  @ApiProperty({
    description: 'The date and time when the summary was created',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'The date and time when the summary was last updated',
  })
  updatedAt: Date;
}
