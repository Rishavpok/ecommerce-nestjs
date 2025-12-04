import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindproductQueryDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
