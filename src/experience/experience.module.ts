import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Resume } from 'src/resume/entities/resume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Experience, Resume])],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
