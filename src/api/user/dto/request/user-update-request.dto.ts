import { IsString, IsBoolean, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateRequestDto {
  @IsNotEmpty({ message: '이름(firstName)은 필수값입니다.' })
  @IsString({ message: '이름(firstName)의 형식이 올바르지 않습니다.' })
  @Length(1, 50)
  @ApiProperty({ description: '이름' })
  firstName: string;

  @IsNotEmpty({ message: '성(lastName)은 필수값입니다.' })
  @IsString({ message: '성(lastName)의 형식이 올바르지 않습니다.' })
  @Length(1, 50)
  @ApiProperty({ description: '성' })
  lastName: string;

  @IsNotEmpty({ message: '활동(isActive)은 필수값입니다.' })
  @IsBoolean({ message: '활동(isActive)의 형식이 올바르지 않습니다.' })
  @ApiProperty({ description: '활동' })
  isActive: boolean;

  static of(
    firstName: string,
    lastName: string,
    isActive: boolean,
  ): UserUpdateRequestDto {
    const dto = new UserUpdateRequestDto();
    dto.firstName = firstName;
    dto.lastName = lastName;
    dto.isActive = isActive;

    return dto;
  }
}
