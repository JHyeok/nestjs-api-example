import { User } from '../user.entity';

export class UserResponseDto {
  private firstName?: string;
  private lastName?: string;

  constructor(user: User) {
    const { firstName, lastName } = user;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
