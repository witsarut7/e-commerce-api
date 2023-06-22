import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class MultiSelect {
  @ApiProperty({ example: [1, 2, 3] })
  @IsNumber({}, { each: true })
  @IsOptional()
  ids: number[];
}
