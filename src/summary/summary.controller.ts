import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SummaryService } from './summary.service';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('summary')
@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new summary' })
  @ApiBody({ type: CreateSummaryDto })
  create(@Body() createSummaryDto: CreateSummaryDto) {
    return this.summaryService.create(createSummaryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all summaries' })
  findAll() {
    return this.summaryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a summary by ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.summaryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a summary by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateSummaryDto })
  update(@Param('id') id: string, @Body() updateSummaryDto: UpdateSummaryDto) {
    return this.summaryService.update(+id, updateSummaryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a summary by ID' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.summaryService.remove(+id);
  }
}
