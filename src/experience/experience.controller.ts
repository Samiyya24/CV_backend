import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new experience entry' })
  @ApiBody({ type: CreateExperienceDto })
  create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experienceService.create(createExperienceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all experience entries' })
  findAll() {
    return this.experienceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an experience entry by ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.experienceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an experience entry by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateExperienceDto })
  update(
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experienceService.update(+id, updateExperienceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an experience entry by ID' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.experienceService.remove(+id);
  }
}
