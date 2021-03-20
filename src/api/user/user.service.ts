import { NotFoundException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import Message from './user.message';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * 유저를 생성한다.
   *
   * @param {UserCreateRequestDto} requestDto - 유저 생성 Dto
   * @returns {Promise<User>}
   */
  createUser(requestDto: UserCreateRequestDto): Promise<User> {
    const user = this.userRepository.create(requestDto);

    return this.userRepository.save(user);
  }

  /**
   * 모든 유저 정보를 조회한다.
   *
   * @returns {Promise<User[]>}
   */
  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * 유저 Id에 해당하는 유저 정보를 조회한다.
   *
   * @param {number} id - 유저 Id
   * @returns {Promise<User>}
   */
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user === undefined) {
      throw new NotFoundException(Message.NOT_FOUND_USER);
    }

    return user;
  }

  /**
   * 유저 Id에 해당하는 유저 정보를 수정한다.
   *
   * @param {number} id - 유저 Id
   * @param {UserUpdateRequestDto} requestDto - 유저 수정 Dto
   * @returns {Promise<User>}
   */
  async updateUser(
    id: number,
    requestDto: UserUpdateRequestDto,
  ): Promise<User> {
    const userToUpdate = await this.getUserById(id);

    userToUpdate.firstName = requestDto.firstName;
    userToUpdate.lastName = requestDto.lastName;
    userToUpdate.isActive = requestDto.isActive;

    return this.userRepository.save(userToUpdate);
  }

  /**
   * 유저 Id에 해당하는 유저 정보를 삭제한다.
   *
   * @param {number} id - 유저 Id
   * @returns {Promise<void>}
   */
  async removeUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
