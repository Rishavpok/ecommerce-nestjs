import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { CategoryModule } from './module/category/category.module';
import { ProductModule } from './module/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './module/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CategoryModule,
    ProductModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
