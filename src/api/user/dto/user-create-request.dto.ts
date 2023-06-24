import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../domain/user.entity';

export class UserCreateRequestDto {
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

  static of(firstName: string, lastName: string): UserCreateRequestDto {
    const dto = new UserCreateRequestDto();
    dto.firstName = firstName;
    dto.lastName = lastName;

    return dto;
  }

  toEntity(): User {
    return User.create(this.firstName, this.lastName);
  }
}
