import {
  Body,
  Controller,
  Patch,
  Post,
  Param,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindproductQueryDto } from './dto/findproduct.dto';

@Controller('product')
export class ProductController {
  constructor(private _productService: ProductService) {}

  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return await this._productService.createProduct(product);
  }

  @Get()
  async getAllProducts(@Query() query: FindproductQueryDto) {
    return await this._productService.findAll(query);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ) {
    return await this._productService.updateProduct(Number(id), product);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this._productService.delete(Number(id));
  }
}
