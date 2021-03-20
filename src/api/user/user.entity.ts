import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 50,
  })
  firstName!: string;

  @Column({
    length: 50,
  })
  lastName!: string;

  @Column({ default: true })
  isActive!: boolean;

  static of(params: Partial<User>): User {
    const user = new User();

    Object.assign(user, params);

    return user;
  }
}
