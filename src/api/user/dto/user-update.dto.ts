import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserUpdate {
  @ApiProperty({ required: false })
  @IsOptional()
  firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  username: string;
}
