import { User } from '../domain/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserNameResponseDto {
  @ApiProperty({ description: '이름' })
  name: string;

  constructor(user: User) {
    const { firstName, lastName } = user;
    this.name = `${lastName} ${firstName}`;
  }
}
