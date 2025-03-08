import { DataSource } from 'typeorm';
import { Test } from '@nestjs/testing';
import { UserModule } from 'src/api/user/user.module';
import { TestMySQLModule } from '../../test-mysql.module';
import { UserRepository } from 'src/api/user/user.repository';
import { User } from 'src/api/user/domain/user.entity';

describe('UserRepository', () => {
  let dataSource: DataSource;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule, TestMySQLModule],
    }).compile();

    dataSource = module.get(DataSource);
    userRepository = module.get(UserRepository);
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('findOneByUserId', async () => {
    const firstName = '김';
    const lastName = '재혁';
    const user = User.of(firstName, lastName, true);
    const savedUser = await userRepository.save(user);

    const result = await userRepository.findOneByUserId(savedUser.id);

    expect(result.id).toBe(savedUser.id);
    expect(result.firstName).toBe(firstName);
    expect(result.lastName).toBe(lastName);
  });

  it('findAllName', async () => {
    const firstName = '김';
    const lastName = '재혁';
    const user = User.of(firstName, lastName, true);
    await userRepository.save(user);

    const result = await userRepository.findAllName();

    expect(result).toHaveLength(1);
    expect(result[0].firstName).toBe(firstName);
    expect(result[0].lastName).toBe(lastName);
  });
});
