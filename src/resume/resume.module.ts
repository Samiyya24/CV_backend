import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { User } from 'src/users/entities/user.entity';
import { Education } from 'src/education/entities/education.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { Interest } from 'src/interest/entities/interest.entity';
import { Language } from 'src/language/entities/language.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import { Summary } from 'src/summary/entities/summary.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Resume,
      User,
      Education,
      Experience,
      Interest,
      Language,
      Skill,
      Summary,
    ]),
  ],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
