import { Injectable } from '@nestjs/common';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepo: Repository<Education>,
  ) {}

  create(createEducationDto: CreateEducationDto) {
    return this.educationRepo.save(createEducationDto);
  }

  findAll() {
    return this.educationRepo.find({relations: ['resume']});
  }

  findOne(id: number) {
    return this.educationRepo.findOneBy({ id });
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    await this.educationRepo.update({ id }, updateEducationDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.educationRepo.delete({ id });
    return id;
  }
}
