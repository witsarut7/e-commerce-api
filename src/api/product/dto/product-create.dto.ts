import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductCreate {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  productName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price: number;
}
