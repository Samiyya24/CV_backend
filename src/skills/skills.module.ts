import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Resume } from 'src/resume/entities/resume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skill, Resume])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
