import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    length: 50,
  })
  public firstName: string;

  @Column({
    length: 50,
  })
  public lastName: string;

  @Column({ default: true })
  public isActive: boolean;

  public static of(params: Partial<User>): User {
    const user = new User();

    Object.assign(user, params);

    return user;
  }
}
