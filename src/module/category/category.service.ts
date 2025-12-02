import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(category: CreateCategoryDto) {
    try {
      // Optional: Prevent duplicate category names
      const exists = await this.prisma.category.findFirst({
        where: { name: category.name },
      });
      if (exists) {
        throw new HttpException(
          'Category already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.prisma.category.create({
        data: {
          name: category.name,
          description: category.description,
        },
      });
    } catch (e) {
      throw new HttpException(
        'Failed to create category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    const exist = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!exist) {
      throw new HttpException(
        'Category  does not exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.prisma.category.update({
        where: { id },
        data: category,
      });
    } catch (e) {
      throw new HttpException(
        'Failed to update category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    const categories = await this.prisma.category.findMany();

    return {
      data: categories,
    };
  }

  async delete(id: number) {
    const exist = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!exist) {
      throw new HttpException(
        'Category  does not exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      await this.prisma.category.delete({
        where: { id },
      });

      return {
        message: 'Category deleted successfully',
      };
    } catch (e) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
