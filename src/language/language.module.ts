import { Module } from '@nestjs/common';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { Resume } from 'src/resume/entities/resume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Language, Resume])],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}
