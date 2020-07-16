import { IsString, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiPropertyOptional()
  firstName: string;

  @IsString()
  @ApiPropertyOptional()
  lastName: string;

  @IsBoolean()
  @ApiPropertyOptional()
  isActive: boolean;
}
