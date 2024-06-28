import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new language entry' })
  @ApiBody({ type: CreateLanguageDto })
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.create(createLanguageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all language entries' })
  findAll() {
    return this.languageService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a language entry by ID' })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a language entry by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateLanguageDto })
  update(
    @Param('id') id: string,
    @Body() updateLanguageDto: UpdateLanguageDto,
  ) {
    return this.languageService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a language entry by ID' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}
