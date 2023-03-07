import { IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class MarketItemSearchRequest {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  categoryId: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Min(1)
  @Max(50)
  @Type(() => Number)
  size: number;
}
