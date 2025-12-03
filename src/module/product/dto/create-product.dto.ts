import { IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  price: number;

  @IsInt()
  stock: number;

  @IsString()
  image: string;

  @IsInt()
  categoryId: number;
}
