import { Injectable } from '@nestjs/common';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interest } from './entities/interest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(Interest)
    private readonly interestRepo: Repository<Interest>,
  ) {}

  create(createInterestDto: CreateInterestDto) {
    return this.interestRepo.save(createInterestDto);
  }

  findAll() {
    return this.interestRepo.find({relations: ['resume']});
  }

  findOne(id: number) {
    return this.interestRepo.findOneBy({ id });
  }

  async update(id: number, updateInterestDto: UpdateInterestDto) {
    await this.interestRepo.update({ id }, updateInterestDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.interestRepo.delete({ id });
    return id;
  }
}
