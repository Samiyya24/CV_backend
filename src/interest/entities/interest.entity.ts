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
export class Interest {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier of the interest' })
  id: number;

  @Column()
  @ApiProperty({ description: 'The name of the interest' })
  name: string;

  @ManyToOne(() => Resume, (resume) => resume.interest)
  @ApiProperty({ description: 'The resume associated with this interest' })
  resume: Resume;

  @Column()
  @ApiProperty({
    description: 'The ID of the resume associated with this interest',
  })
  resumeId: number;

  @CreateDateColumn()
  @ApiProperty({
    description: 'The date and time when the interest entry was created',
  })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({
    description: 'The date and time when the interest entry was last updated',
  })
  updatedAt: Date;
}
