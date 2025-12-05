import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CreateCartDto {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  productId: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  quantity: number;
}
