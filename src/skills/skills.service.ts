import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './entities/skill.entity';
import { Repository } from 'typeorm';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('skills')
@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepo: Repository<Skill>,
  ) {}

  @ApiOperation({ summary: 'Create a new skill entry' })
  @ApiBody({ type: CreateSkillDto })
  create(createSkillDto: CreateSkillDto) {
    return this.skillRepo.save(createSkillDto);
  }

  @ApiOperation({ summary: 'Get all skills with associated resumes' })
  findAll() {
    return this.skillRepo.find({ relations: ['resume'] });
  }

  @ApiOperation({ summary: 'Get a skill by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(id: number) {
    return this.skillRepo.findOneBy({id});
  }

  @ApiOperation({ summary: 'Update a skill by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateSkillDto })
  async update(id: number, updateSkillDto: UpdateSkillDto) {
    await this.skillRepo.update({ id }, updateSkillDto);
    return this.findOne(id);
  }

  @ApiOperation({ summary: 'Delete a skill by ID' })
  @ApiParam({ name: 'id', type: Number })
  async remove(id: number) {
    await this.skillRepo.delete({ id });
    return id;
  }
}
