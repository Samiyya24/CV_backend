import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { Resume } from 'src/resume/entities/resume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Education, Resume])],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
