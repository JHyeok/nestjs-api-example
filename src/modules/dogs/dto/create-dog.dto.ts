import { IsString, IsInt } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDogDto {
  @IsString()
  @ApiPropertyOptional()
  name: string;

  @IsInt()
  @ApiPropertyOptional()
  age: number;

  @IsString()
  @ApiPropertyOptional()
  breed: string;
}