import { IsInt, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  price: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  stock: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  categoryId: number;
}
