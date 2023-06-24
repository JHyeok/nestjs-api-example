import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CustomRepository } from '../../decorator/typeorm-ex.decorator';
import { plainToInstance } from 'class-transformer';
import { UserName } from './domain/user-name';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  /**
   * 유저 Id에 해당하는 유저 정보를 조회한다.
   *
   * @param {number} userId - 유저 Id
   * @returns {Promise<User>}
   */
  async findOneByUserId(userId: number): Promise<User> {
    return await this.findOne({
      where: { id: userId },
    });
  }

  /**
   * 모든 유저의 이름을 조회한다.
   *
   * @returns {Promise<UserName[]>}
   */
  async findAllName(): Promise<UserName[]> {
    const users = await this.createQueryBuilder('user')
      .select(['firstName', 'lastName'])
      .getRawMany();

    return plainToInstance(UserName, users);
  }

  /*
  async updateUser(user: User): Promise<void> {
    await this.createQueryBuilder()
      .update(User)
      .set(user)
      .where("id = :id", { id: user.id })
      .execute();
  }

  async upsertUser(user: User): Promise<void> {
    await this.upsert(user, ['id']);
  }

  async upsertUser(user: User): Promise<void> {
    await this.createQueryBuilder()
      .insert()
      .into(User, ['id', 'firstName', 'lastName', 'isActive'])
      .values(user)
      .orUpdate(['firstName', 'lastName', 'isActive'], ['id'])
      .execute();
  }
  */
}
