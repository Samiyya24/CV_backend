import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';
import { Resume } from 'src/resume/entities/resume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Interest, Resume])],
  controllers: [InterestController],
  providers: [InterestService],
})
export class InterestModule {}
