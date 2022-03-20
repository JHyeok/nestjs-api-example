import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/api/user/user.entity';
import { UserService } from 'src/api/user/user.service';
import { UserCreateRequestDto } from 'src/api/user/dto/user-create-request.dto';
import { UserUpdateRequestDto } from 'src/api/user/dto/user-update-request.dto';
import { NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/api/user/user.repository';
import { DeleteResult } from 'typeorm';

describe('UserService (Stub)', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('createUser', () => {
    it('유저를 생성하고, 생성한 유저를 반환한다', async () => {
      const firstName = '재혁';
      const lastName = '김';
      const requestDto: UserCreateRequestDto = {
        firstName: firstName,
        lastName: lastName,
      };
      const createdUserEntity = User.of(requestDto);
      const savedUser = User.of({
        id: 1,
        firstName: firstName,
        lastName: lastName,
        isActive: true,
      });
      const userRepositoryCreateSpy = jest
        .spyOn(userRepository, 'create')
        .mockReturnValue(createdUserEntity);
      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(savedUser);

      const result = await userService.createUser(requestDto);

      expect(userRepositoryCreateSpy).toBeCalledWith(requestDto);
      expect(userRepositorySaveSpy).toBeCalledWith(createdUserEntity);
      expect(result).toEqual(savedUser);
    });
  });

  describe('getUsers', () => {
    it('생성된 모든 유저 목록을 반환한다', async () => {
      const existingUserList = [
        User.of({
          id: 1,
          firstName: '재혁',
          lastName: '김',
          isActive: true,
        }),
        User.of({
          id: 2,
          firstName: '길동',
          lastName: '홍',
          isActive: true,
        }),
      ];
      const userRepositoryFindSpy = jest
        .spyOn(userRepository, 'find')
        .mockResolvedValue(existingUserList);

      const result = await userService.getUsers();

      expect(userRepositoryFindSpy).toBeCalled();
      expect(result).toBe(existingUserList);
    });
  });

  describe('getUserById', () => {
    it('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', async () => {
      const userId = 1;
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      const result = async () => {
        await userService.getUserById(userId);
      };

      await expect(result).rejects.toThrowError(
        new NotFoundException('유저 정보를 찾을 수 없습니다.'),
      );
    });

    it('생성된 유저의 id가 주어진다면 해당 id의 유저를 반환한다', async () => {
      const userId = 1;
      const existingUser = User.of({
        id: userId,
        firstName: '재혁',
        lastName: '김',
        isActive: true,
      });
      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(existingUser);

      const result = await userService.getUserById(userId);

      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
      });
      expect(result).toBe(existingUser);
    });
  });

  describe('updateUser', () => {
    it('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', async () => {
      const userId = 1;
      const requestDto: UserUpdateRequestDto = {
        firstName: '길동',
        lastName: '김',
        isActive: false,
      };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      const result = async () => {
        await userService.updateUser(userId, requestDto);
      };

      await expect(result).rejects.toThrowError(
        new NotFoundException('유저 정보를 찾을 수 없습니다.'),
      );
    });

    it('생성된 유저의 id가 주어진다면 해당 id의 유저를 수정하고 수정된 유저를 반환한다', async () => {
      const userId = 1;
      const requestDto: UserUpdateRequestDto = {
        firstName: '길동',
        lastName: '김',
        isActive: false,
      };
      const existingUser = User.of({
        id: userId,
        firstName: '재혁',
        lastName: '김',
        isActive: true,
      });
      const savedUser = User.of({
        id: userId,
        ...requestDto,
      });
      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(existingUser);
      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue(savedUser);

      const result = await userService.updateUser(userId, requestDto);

      expect(userRepositoryFindOneSpy).toHaveBeenCalledWith({
        where: {
          id: userId,
        },
      });
      expect(userRepositorySaveSpy).toHaveBeenCalledWith(savedUser);
      expect(result).toEqual(savedUser);
    });
  });

  describe('deleteUser', () => {
    it('생성된 유저의 id가 주어진다면 생성된 유저를 삭제한다', async () => {
      const userId = 1;
      const userRepositoryDeleteSpy = jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue({} as DeleteResult);

      const result = await userService.deleteUser(userId);

      expect(userRepositoryDeleteSpy).toHaveBeenCalledWith(userId);
      expect(result).toBe(undefined);
    });
  });
});
