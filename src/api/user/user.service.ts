import { NotFoundException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/api/user/user.repository';
import { User } from 'src/api/user/user.entity';
import { UserCreateRequestDto } from 'src/api/user/dto/user-create-request.dto';
import { UserUpdateRequestDto } from 'src/api/user/dto/user-update-request.dto';
import Message from 'src/api/user/user.message';

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
    const user = this.userRepository.create(User.of(requestDto));

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
    const user = await this.getUserById(id);
    const { firstName, lastName, isActive } = requestDto;

    user.update(firstName, lastName, isActive);

    return this.userRepository.save(user);
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
