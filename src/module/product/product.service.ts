import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(product: CreateProductDto) {
    try {
      await this.prisma.product.create({
        data: product,
      });

      return {
        message: 'Product added successfully',
      };
    } catch (e) {
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

  async findAll() {
    const products = await this.prisma.product.findMany();
    return {
      data: products,
    };
  }
}
