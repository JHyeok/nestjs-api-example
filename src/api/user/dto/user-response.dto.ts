import { User } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: '이름' })
  private firstName?: string;
  @ApiProperty({ description: '성' })
  private lastName?: string;

  constructor(user: User) {
    const { firstName, lastName } = user;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
