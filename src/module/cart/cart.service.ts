import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CreateCartDto } from './dto/create-cart.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async createCart(dto: CreateCartDto, userId: number) {
    const product = await this.prisma.product.findFirst({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    if (product.stock < dto.quantity) {
      throw new HttpException('Stock not available', HttpStatus.BAD_REQUEST);
    }

    const existing = await this.prisma.cart.findFirst({
      where: { userId, productId: dto.productId },
    });

    if (existing) {
      await this.prisma.cart.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + dto.quantity,
        },
      });

      return { message: 'Cart updated' };
    }

    await this.prisma.cart.create({
      data: {
        userId,
        productId: dto.productId,
        quantity: dto.quantity,
      },
    });

    return { message: 'Product added to cart' };
  }

  async getCarts(userId: number) {
    try {
      const carts = await this.prisma.cart.findMany({
        where: { userId },
      });

      if (carts.length === 0) {
        return {
          data: [],
          message: 'Cart is empty',
        };
      }

      return {
        data: carts,
      };
    } catch (e) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(productId: number, userId: number) {
    try {
      // get all the carts for specific user
      const cartItem = await this.prisma.cart.findFirst({
        where: { userId, productId },
      });

      if (!cartItem) {
        throw new HttpException('Cart item not found', HttpStatus.NOT_FOUND);
      }

      // delete the cart item
      await this.prisma.cart.delete({
        where: { id: cartItem.id },
      });

      return { message: 'Cart item deleted successfully' };
    } catch (e) {
      throw new HttpException('Something went wrong', HttpStatus.NOT_FOUND);
    }
  }
}
