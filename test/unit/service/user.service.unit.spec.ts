import { Test } from '@nestjs/testing';
import { User } from 'src/api/user/domain/user.entity';
import { UserService } from 'src/api/user/user.service';
import { UserCreateRequestDto } from 'src/api/user/dto/request/user-create-request.dto';
import { UserUpdateRequestDto } from 'src/api/user/dto/request/user-update-request.dto';
import { NotFoundException } from '@nestjs/common';
import { UserMessage } from 'src/api/user/user.message';
import { UserRepository } from 'src/api/user/user.repository';
import { DeleteResult } from 'typeorm';

describe('UserService (Unit)', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    userService = module.get(UserService);
    userRepository = module.get(UserRepository);
  });

  describe('create', () => {
    it('유저를 생성하고, 생성한 유저를 반환한다', async () => {
      const firstName = '재혁';
      const lastName = '김';
      const requestDto = UserCreateRequestDto.of(firstName, lastName);
      const savedUser = User.of(firstName, lastName, true);
      jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser);

      const result = await userService.create(requestDto);

      expect(result.firstName).toBe(firstName);
      expect(result.lastName).toBe(lastName);
    });
  });

  describe('findAll', () => {
    it('생성된 모든 유저 목록을 반환한다', async () => {
      const existingUserList = [
        User.of('재혁', '김', true),
        User.of('길동', '홍', true),
      ];
      jest.spyOn(userRepository, 'find').mockResolvedValue(existingUserList);

      const result = await userService.findAll();

      expect(result).toStrictEqual(existingUserList);
    });
  });

  describe('findById', () => {
    it('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', async () => {
      const userId = 1;
      jest.spyOn(userRepository, 'findOneByUserId').mockResolvedValue(null);

      const result = async () => {
        await userService.findById(userId);
      };

      await expect(result).rejects.toThrowError(
        new NotFoundException(UserMessage.USER_NOT_FOUND),
      );
    });

    it('생성된 유저의 id가 주어진다면 해당 id의 유저를 반환한다', async () => {
      const userId = 1;
      const existingUser = User.of('재혁', '김', true);
      jest
        .spyOn(userRepository, 'findOneByUserId')
        .mockResolvedValue(existingUser);

      const result = await userService.findById(userId);

      expect(result.firstName).toBe('재혁');
      expect(result.lastName).toBe('김');
    });
  });

  describe('update', () => {
    it('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', async () => {
      const userId = 1;
      const requestDto = UserUpdateRequestDto.of('길동', '김', false);
      jest.spyOn(userRepository, 'findOneByUserId').mockResolvedValue(null);

      const result = async () => {
        await userService.update(userId, requestDto);
      };

      await expect(result).rejects.toThrowError(
        new NotFoundException(UserMessage.USER_NOT_FOUND),
      );
    });

    it('생성된 유저의 id가 주어진다면 해당 id의 유저를 수정하고 수정된 유저를 반환한다', async () => {
      const userId = 1;
      const lastName = '김';
      const firstName = '길동';
      const requestDto = UserUpdateRequestDto.of(firstName, lastName, false);
      const existingUser = User.of('재혁', lastName, true);
      const savedUser = User.of(firstName, lastName, false);
      jest
        .spyOn(userRepository, 'findOneByUserId')
        .mockResolvedValue(existingUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(savedUser);

      const result = await userService.update(userId, requestDto);

      expect(result.firstName).toBe(firstName);
      expect(result.lastName).toBe(lastName);
    });
  });

  describe('delete', () => {
    it('생성된 유저의 id가 주어진다면 생성된 유저를 삭제한다', async () => {
      const userId = 1;
      jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValue({} as DeleteResult);

      const result = await userService.delete(userId);

      expect(result).toBeUndefined();
    });
  });
});
