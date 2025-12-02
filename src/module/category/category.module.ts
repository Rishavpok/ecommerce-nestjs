import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoryController } from './category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // <-- Required
      signOptions: { expiresIn: '7d' }, // Token expiry
    }),
  ],
})
export class CategoryModule {}
