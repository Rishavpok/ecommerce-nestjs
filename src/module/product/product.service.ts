import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindproductQueryDto } from './dto/findproduct.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(dto: CreateProductDto, imageUrl: string) {
    try {
      return await this.prisma.product.create({
        data: {
          ...dto,
          image: imageUrl, // store image URL in DB
        },
      });
    } catch (error) {
      throw new HttpException(
        'Failed to create product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProduct(id: number, product: UpdateProductDto) {
    const exist = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!exist) {
      throw new HttpException('Product does not exists', HttpStatus.NOT_FOUND);
    }

    try {
      await this.prisma.product.update({
        where: { id },
        data: product,
      });

      return {
        message: 'Product updated successfully',
      };
    } catch (e) {
      throw new HttpException(
        'Failed to update product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number) {
    const exist = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!exist) {
      throw new HttpException('Product does not exists', HttpStatus.NOT_FOUND);
    }

    try {
      await this.prisma.product.delete({
        where: { id },
      });

      return {
        message: 'Product deleted successfully',
      };
    } catch (e) {
      throw new HttpException(
        'Failed to delete product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(query: FindproductQueryDto) {
    const take = query.limit ? Number(query.limit) : 10;
    const page = query.page ? Number(query.page) : 1;
    const skip = (page - 1) * take;
    const search = query.search;

    // build filter
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        take,
        skip,
      }),
      this.prisma.product.count({ where }),
    ]);
    return {
      data: products,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / take),
        limit: take,
      },
    };
  }
}
