import { Injectable } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly expRepo: Repository<Experience>,
  ) {}

  create(createExperienceDto: CreateExperienceDto) {
    return this.expRepo.save(createExperienceDto);
  }

  findAll() {
    return this.expRepo.find({relations: ['resume']});
  }

  findOne(id: number) {
    return this.expRepo.findOneBy({ id });
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    await this.expRepo.update({ id }, updateExperienceDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.expRepo.delete({ id });
    return id;
  }
}
