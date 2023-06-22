import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CommonFilter } from 'src/shared/common-filter';

export class ProductFilter extends CommonFilter {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  productName: string;
}
