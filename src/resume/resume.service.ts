import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createResumeDto: CreateResumeDto) {
    return this.resumeRepo.save(createResumeDto);
  }

  async findAll() {
    return this.resumeRepo.find({
      relations: [
        'user',
        'education',
        'experience',
        'language',
        'interest',
        'skills',
        'summary',
      ],
    });
  }

  async findOne(id: number) {
    const resume = await this.resumeRepo.findOne({where: {id}, 
      relations: [
        'user',
        'education',
        'experience',
        'language',
        'interest',
        'skills',
        'summary',
      ],
    });
    if (!resume) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }
    return resume;
  }

  async update(id: number, updateResumeDto: UpdateResumeDto) {
    await this.resumeRepo.update({ id }, updateResumeDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.resumeRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Resume with ID ${id} not found`);
    }
    return id;
  }
}
