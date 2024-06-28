import { Injectable } from '@nestjs/common';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Summary } from './entities/summary.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(Summary)
    private readonly summaryRepo: Repository<Summary>,
  ) {}

  create(createSummaryDto: CreateSummaryDto) {
    return this.summaryRepo.save(createSummaryDto);
  }

  findAll() {
    return this.summaryRepo.find({relations: ['resume']});
  }

  findOne(id: number) {
    return this.summaryRepo.findOneBy({ id });
  }

  async update(id: number, updateSummaryDto: UpdateSummaryDto) {
    await this.summaryRepo.update({ id }, updateSummaryDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.summaryRepo.delete({ id });
    return id;
  }
}
