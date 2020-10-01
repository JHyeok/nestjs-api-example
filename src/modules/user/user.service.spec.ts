import * as faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, UserRepositoryFake } from '../user/user.entity';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryFake,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(User));
  });

  describe('유저 정보 생성', () => {
    it('유저 정보를 성공적으로 생성한다.', async () => {
      const firstName = faker.lorem.sentence();
      const lastName = faker.lorem.sentence();

      const createUserDto: CreateUserDto = {
        firstName: firstName,
        lastName: lastName,
      };

      const createdUserEntity = User.of(createUserDto);

      const savedUser = User.of({
        id: faker.random.uuid(),
        firstName: firstName,
        lastName: lastName,
        isActive: true,
      });

      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(savedUser);

      const result = await userService.createUser(createdUserEntity);

      expect(userRepositorySaveSpy).toBeCalledWith(createdUserEntity);
      expect(result).toEqual(savedUser);
    });
  });

  describe('유저 목록 조회', () => {
    it('모든 유저 정보 목록을 성공적으로 불러온다.', async () => {
      const existingUserList = [
        User.of({
          id: faker.random.uuid(),
          firstName: faker.lorem.sentence(),
          lastName: faker.lorem.sentence(),
          isActive: true,
        }),
        User.of({
          id: faker.random.uuid(),
          firstName: faker.lorem.sentence(),
          lastName: faker.lorem.sentence(),
          isActive: true,
        }),
      ];

      const userRepositoryFindSpy = jest
        .spyOn(userRepository, 'find')
        .mockResolvedValue(existingUserList);

      const result = await userService.getUsers();

      expect(result).toBe(existingUserList);
      expect(userRepositoryFindSpy).toBeCalled();
    });
  });

  describe('유저 정보 조회', () => {
    it('유저 정보를 성공적으로 불러온다.', async () => {
      const userId = faker.random.uuid();

      const existingUser = User.of({
        id: userId,
        firstName: faker.lorem.sentence(),
        lastName: faker.lorem.sentence(),
        isActive: true,
      });

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(existingUser);

      const result = await userService.getUserById(userId);

      expect(result).toBe(existingUser);
      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
      });
    });
  });

  describe('유저 정보 수정', () => {
    it('존재하지 않는 유저 정보를 수정할 경우 BadRequestError 발생한다.', async () => {
      const userId = faker.random.uuid();

      const updateUserDto: UpdateUserDto = {
        firstName: faker.lorem.sentence(),
        lastName: faker.lorem.sentence(),
        isActive: false,
      };

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(null);

      try {
        await userService.updateUser(userId, updateUserDto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe('존재하지 않는 유저 정보입니다.');
      }

      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
      });
    });

    it('유저 정보를 성공적으로 수정한다.', async () => {
      const userId = faker.random.uuid();

      const updateUserDto: UpdateUserDto = {
        firstName: faker.lorem.sentence(),
        lastName: faker.lorem.sentence(),
        isActive: false,
      };

      const existingUser = User.of({
        id: userId,
        firstName: faker.lorem.sentence(),
        lastName: faker.lorem.sentence(),
        isActive: true,
      });

      const savedUser = User.of({
        id: userId,
        ...updateUserDto,
      });

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(existingUser);

      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(savedUser);

      const result = await userService.updateUser(userId, updateUserDto);

      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
      });
      expect(userRepositorySaveSpy).toHaveBeenCalledWith(savedUser);
      expect(result).toEqual(savedUser);
    });
  });

  describe('유저 정보 삭제', () => {
    it('유저 정보를 성공적으로 삭제한다.', async () => {
      const userId = faker.random.uuid();

      const userRepositoryDeleteSpy = jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue(null);

      const result = await userService.removeUser(userId);

      expect(userRepositoryDeleteSpy).toHaveBeenCalledWith(userId);
      expect(result).toBe(undefined);
    });
  });
});
