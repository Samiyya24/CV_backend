import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Resume } from './entities/resume.entity';

@ApiTags('resume')
@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new resume' })
  @ApiResponse({ status: 201, description: 'The resume has been successfully created.', type: Resume })
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.create(createResumeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all resumes' })
  @ApiResponse({ status: 200, description: 'Returns all resumes.', type: [Resume] })
  findAll() {
    return this.resumeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a resume by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Resume ID' })
  @ApiResponse({ status: 200, description: 'Returns the resume.', type: Resume })
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a resume by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Resume ID' })
  @ApiResponse({ status: 200, description: 'The resume has been successfully updated.', type: Resume })
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(+id, updateResumeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a resume by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Resume ID' })
  @ApiResponse({ status: 200, description: 'The resume has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.resumeService.remove(+id);
  }
}
