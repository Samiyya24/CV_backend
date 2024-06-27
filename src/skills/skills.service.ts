import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill) private readonly skillRepo: Repository<Skill>,
  ) {}

  create(createSkillDto: CreateSkillDto) {
    return this.skillRepo.save(createSkillDto);
  }

  findAll() {
    return this.skillRepo.find({relations: ['resume']});
  }

  findOne(id: number) {
    return this.skillRepo.findOneBy({ id });
  }

  async update(id: number, updateSkillDto: UpdateSkillDto) {
    await this.skillRepo.update({ id }, updateSkillDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.skillRepo.delete({ id });
    return id;
  }
}
