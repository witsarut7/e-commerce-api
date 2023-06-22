import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class OrderCreate {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  quantity: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  orderStatus: boolean;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  productId: number;
}
