import { IsNotEmpty, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: '이름(firstName)은 필수값입니다.' })
  @IsString({ message: '이름(firstName)의 형식이 올바르지 않습니다.' })
  @ApiPropertyOptional()
  firstName: string;

  @IsNotEmpty({ message: '성(lastName)은 필수값입니다.' })
  @IsString({ message: '성(lastName)의 형식이 올바르지 않습니다.' })
  @ApiPropertyOptional()
  lastName: string;
}
