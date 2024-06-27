import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  level: string; // Can be beginner, intermediate, advanced, etc.

  @ManyToOne(() => Resume, (resume) => resume.skills)
  resume: Resume;

  @Column()
  resumeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
