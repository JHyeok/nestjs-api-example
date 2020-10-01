import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ default: true })
  public isActive: boolean;

  public static of(params: Partial<User>): User {
    const user = new User();

    Object.assign(user, params);

    return user;
  }
}

/**
 * 단위 테스트에 사용되는 Fake Repository
 */
export class UserRepositoryFake {
  public async save(): Promise<void> {}
  public async findOne(): Promise<void> {}
  public async find(): Promise<void> {}
  public async delete(): Promise<void> {}
}
