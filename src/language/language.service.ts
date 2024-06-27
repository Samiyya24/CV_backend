import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepo: Repository<Language>,
  ) {}

  create(createLanguageDto: CreateLanguageDto) {
    return this.languageRepo.save(createLanguageDto);
  }

  findAll() {
    return this.languageRepo.find({relations: ['resume']});
  }

  findOne(id: number) {
    return this.languageRepo.findOneBy({ id });
  }

  async update(id: number, updateLanguageDto: UpdateLanguageDto) {
    await this.languageRepo.update({ id }, updateLanguageDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.languageRepo.delete({ id });
    return id;
  }
}
