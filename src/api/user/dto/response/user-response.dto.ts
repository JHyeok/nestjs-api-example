import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../domain/user.entity';

export class UserResponseDto {
  @Exclude() private readonly _firstName: string;
  @Exclude() private readonly _lastName: string;

  constructor(user: User) {
    this._firstName = user.firstName;
    this._lastName = user.lastName;
  }

  @ApiProperty({ description: '이름' })
  @Expose()
  get firstName(): string {
    return this._firstName;
  }

  @ApiProperty({ description: '성' })
  @Expose()
  get lastName(): string {
    return this._lastName;
  }
}
