import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CommonFilter } from 'src/shared/common-filter';

export class OrderFilter extends CommonFilter {
  @ApiProperty({ required: false, example: '2023-01-01' })
  @IsOptional()
  startDate: Date;

  @ApiProperty({ required: false, example: '2023-12-31' })
  @IsOptional()
  endDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  productId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  orderStatus: boolean;
}
