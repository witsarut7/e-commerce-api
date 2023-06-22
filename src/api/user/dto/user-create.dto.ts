import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserCreate {
  @ApiProperty({ required: true })
  @IsOptional()
  firstName: string;

  @ApiProperty({ required: true })
  @IsOptional()
  lastName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  phoneNumber: string;

  @ApiProperty({ required: false })
  @IsOptional()
  email: string;

  @ApiProperty({ required: true })
  @IsOptional()
  username: string;

  @ApiProperty({ required: true })
  @IsOptional()
  password: string;
}
