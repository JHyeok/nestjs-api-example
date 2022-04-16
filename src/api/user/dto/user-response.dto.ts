import { User } from 'src/api/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: '이름' })
  private readonly _firstName: string;
  @ApiProperty({ description: '성' })
  private readonly _lastName: string;

  constructor(user: User) {
    const { firstName, lastName } = user;
    this._firstName = firstName;
    this._lastName = lastName;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }
}
