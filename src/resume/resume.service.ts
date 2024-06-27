import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from './entities/resume.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume) private readonly resumeRepo: Repository<Resume>,
  ) {}

  create(createResumeDto: CreateResumeDto) {
    return this.resumeRepo.save(createResumeDto);
  }

  findAll() {
    return this.resumeRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.resumeRepo.findOneBy({ id });
  }

  async update(id: number, updateResumeDto: UpdateResumeDto) {
    await this.resumeRepo.update({ id }, updateResumeDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.resumeRepo.delete({ id });
    return id;
  }
}
