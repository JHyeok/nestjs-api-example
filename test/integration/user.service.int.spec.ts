import { DataSource } from 'typeorm';
import { Test } from '@nestjs/testing';
import { UserModule } from 'src/api/user/user.module';
import { TestMySQLModule } from '../util/test-mysql.module';
import { UserService } from 'src/api/user/user.service';
import { NotFoundException } from '@nestjs/common';
import { UserMessage } from 'src/api/user/user.message';
import { UserRepository } from 'src/api/user/user.repository';
import { UserCreateRequestDto } from 'src/api/user/dto/user-create-request.dto';
import { UserUpdateRequestDto } from 'src/api/user/dto/user-update-request.dto';

describe('UserService (Integration)', () => {
  let sut: UserService;
  let dataSource: DataSource;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule, TestMySQLModule],
      providers: [UserService, UserRepository],
    }).compile();

    sut = module.get<UserService>(UserService);
    dataSource = module.get<DataSource>(DataSource);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('create', () => {
    it('유저를 생성하고, 생성한 유저를 반환한다', async () => {
      const requestDto = UserCreateRequestDto.of('재혁', '김');

      const result = await sut.create(requestDto);

      expect(result.id).toBe(1);
      expect(result.firstName).toBe('재혁');
      expect(result.lastName).toBe('김');
      expect(result.isActive).toBe(true);
    });
  });

  describe('findAll', () => {
    it('생성된 모든 유저 목록을 반환한다', async () => {
      await userRepository.save({ firstName: '재혁', lastName: '김' });
      await userRepository.save({ firstName: '길동', lastName: '홍' });

      const result = await sut.findAll();

      expect(result[0].firstName).toBe('재혁');
      expect(result[0].lastName).toBe('김');
      expect(result[1].firstName).toBe('길동');
      expect(result[1].lastName).toBe('홍');
    });
  });

  describe('findById', () => {
    it('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', async () => {
      const userId = 1;

      const result = async () => {
        await sut.findById(userId);
      };

      await expect(result).rejects.toThrowError(
        new NotFoundException(UserMessage.USER_NOT_FOUND),
      );
    });

    it('생성된 유저의 id가 주어진다면 해당 id의 유저를 반환한다', async () => {
      const userId = 1;
      await userRepository.save({ firstName: '재혁', lastName: '김' });

      const result = await sut.findById(userId);

      expect(result.firstName).toBe('재혁');
      expect(result.lastName).toBe('김');
    });
  });

  describe('update', () => {
    it('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', async () => {
      const userId = 1;
      const requestDto = UserUpdateRequestDto.of('길동', '김', false);

      const result = async () => {
        await sut.update(userId, requestDto);
      };

      await expect(result).rejects.toThrowError(
        new NotFoundException(UserMessage.USER_NOT_FOUND),
      );
    });

    it('생성된 유저의 id가 주어진다면 해당 id의 유저를 수정하고 수정된 유저를 반환한다', async () => {
      const userId = 1;
      const requestDto = UserUpdateRequestDto.of('길동', '김', false);
      await userRepository.save({ firstName: '재혁', lastName: '김' });

      const result = await sut.update(userId, requestDto);

      expect(result.id).toBe(1);
      expect(result.firstName).toBe('길동');
      expect(result.lastName).toBe('김');
      expect(result.isActive).toBe(false);
    });
  });

  describe('delete', () => {
    it('생성된 유저의 id가 주어진다면 생성된 유저를 삭제한다', async () => {
      const userId = 1;
      await userRepository.save({ firstName: '재혁', lastName: '김' });

      await sut.delete(userId);

      const result = await userRepository.findOneByUserId(userId);
      expect(result).toBeNull();
    });
  });
});
