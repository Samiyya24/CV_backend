import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InterestService } from './interest.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';

@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post()
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestService.create(createInterestDto);
  }

  @Get()
  findAll() {
    return this.interestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInterestDto: UpdateInterestDto) {
    return this.interestService.update(+id, updateInterestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interestService.remove(+id);
  }
}
