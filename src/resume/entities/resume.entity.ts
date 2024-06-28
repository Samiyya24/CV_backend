import { User } from 'src/users/entities/user.entity';
import { Education } from 'src/education/entities/education.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { Interest } from 'src/interest/entities/interest.entity';
import { Language } from 'src/language/entities/language.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { Summary } from 'src/summary/entities/summary.entity'; // Adjust the import path as necessary
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @ManyToOne(() => User, (user) => user.resume)
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => Education, (education) => education.resume)
  education: Education[];

  @OneToMany(() => Experience, (experience) => experience.resume)
  experience: Experience[];

  @OneToMany(() => Interest, (interest) => interest.resume)
  interest: Interest[];

  @OneToMany(() => Language, (language) => language.resume)
  language: Language[];

  @OneToMany(() => Skill, (skill) => skill.resume)
  skills: Skill[];

  @OneToOne(() => Summary, (summary) => summary.resume, { cascade: true })
  summary: Summary;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
