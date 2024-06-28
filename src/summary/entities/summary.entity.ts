import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Resume } from 'src/resume/entities/resume.entity';

@Entity()
export class Summary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @OneToOne(() => Resume, (resume) => resume.summary)
  @JoinColumn()
  resume: Resume;

  @Column()
  resumeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
