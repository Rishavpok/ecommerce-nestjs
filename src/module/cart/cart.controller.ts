import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/auth.guards';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  async create(@Body() cart: CreateCartDto, @Req() req: any) {
    return await this.cartService.createCart(cart, req.user.userId);
  }
  @Get()
  async get(@Req() req: any) {
    return await this.cartService.getCarts(req.user.userId);
  }

  @Delete(':id')
  async delete(@Param('id') productId: string, @Req() req: any) {
    return await this.cartService.delete(Number(productId), req.user.userId);
  }
}
