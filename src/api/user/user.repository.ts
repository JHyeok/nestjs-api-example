import { Repository, EntityRepository } from 'typeorm';
import { User } from 'src/api/user/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
