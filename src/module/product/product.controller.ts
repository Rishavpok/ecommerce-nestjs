import {
  Body,
  Controller,
  Patch,
  Post,
  Param,
  Get,
  Delete,
  UploadedFile,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindproductQueryDto } from './dto/findproduct.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';
import * as multer from 'multer';

@Controller('product')
export class ProductController {
  constructor(
    private _productService: ProductService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', { storage: multer.memoryStorage() }),
  )
  async createProduct(
    @Body() dto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    console.log(dto, imageUrl);
    return this._productService.createProduct(dto, imageUrl);
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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      url: file.path, // Cloudinary returns uploaded file URL here
    };
  }
}
