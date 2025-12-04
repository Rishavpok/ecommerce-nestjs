import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryModule } from '../../cloudinary/cloudinary.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [PrismaModule, CloudinaryModule],
})
export class ProductModule {}
