import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CustomRepository } from '../../decorator/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async findOneByUserId(userId: number): Promise<User> {
    return await this.findOne({
      where: { id: userId },
    });
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
