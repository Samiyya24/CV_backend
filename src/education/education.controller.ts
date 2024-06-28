import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('education')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new education entry' })
  @ApiBody({ type: CreateEducationDto })
  create(@Body() createEducationDto: CreateEducationDto) {
    return this.educationService.create(createEducationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all education entries' })
  findAll() {
    return this.educationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an education entry by ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.educationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an education entry by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateEducationDto })
  update(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationService.update(+id, updateEducationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an education entry by ID' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.educationService.remove(+id);
  }
}
