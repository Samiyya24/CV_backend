import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InterestService } from './interest.service';
import { CreateInterestDto } from './dto/create-interest.dto';
import { UpdateInterestDto } from './dto/update-interest.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('interest')
@Controller('interest')
export class InterestController {
  constructor(private readonly interestService: InterestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new interest entry' })
  @ApiBody({ type: CreateInterestDto })
  create(@Body() createInterestDto: CreateInterestDto) {
    return this.interestService.create(createInterestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all interest entries' })
  findAll() {
    return this.interestService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an interest entry by ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.interestService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an interest entry by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateInterestDto })
  update(
    @Param('id') id: string,
    @Body() updateInterestDto: UpdateInterestDto,
  ) {
    return this.interestService.update(+id, updateInterestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an interest entry by ID' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.interestService.remove(+id);
  }
}
