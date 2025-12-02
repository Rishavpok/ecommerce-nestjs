import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private _categoryService: CategoryService) {}

  @Get()
  async getCategory() {
    return this._categoryService.findAll();
  }

  @Post('create')
  async create(@Body() category: CreateCategoryDto) {
    return this._categoryService.createCategory(category);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() category: UpdateCategoryDto) {
    return this._categoryService.updateCategory(Number(id), category);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this._categoryService.delete(Number(id));
  }
}
