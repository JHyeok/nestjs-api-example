import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id!: number;

  @Column({ length: 50 })
  @ApiProperty({ description: '이름' })
  firstName!: string;

  @Column({ length: 50 })
  @ApiProperty({ description: '성' })
  lastName!: string;

  @Column({ default: true })
  @ApiProperty({ description: '활동' })
  isActive!: boolean;

  static of(params: Partial<User>): User {
    const user = new User();

    Object.assign(user, params);

    return user;
  }

  update(firstName: string, lastName: string, isActive: boolean): void {
    this.firstName = firstName;
    this.lastName = lastName;
    this.isActive = isActive;
  }
}
