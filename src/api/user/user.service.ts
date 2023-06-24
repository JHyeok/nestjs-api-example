import { NotFoundException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import { isEmpty } from '../../util/shared.util';
import { UserMessage } from './user.message';
import { UserResponseDto } from './dto/user-response.dto';
import { UserName } from './domain/user-name';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * 유저를 생성한다.
   *
   * @param {UserCreateRequestDto} requestDto - 유저 생성 Dto
   * @returns {Promise<User>}
   */
  async create(requestDto: UserCreateRequestDto): Promise<User> {
    return await this.userRepository.save(requestDto.toEntity());
  }

  /**
   * 모든 유저 정보를 조회한다.
   *
   * @returns {Promise<User[]>}
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * 모든 유저의 이름을 조회한다.
   *
   * @returns {Promise<UserName[]>}
   */
  async findAllName(): Promise<UserName[]> {
    return await this.userRepository.findAllName();
  }

  /**
   * 유저 Id에 해당하는 유저 정보를 조회한다.
   *
   * @param {number} userId - 유저 Id
   * @returns {Promise<UserResponseDto>}
   */
  async findById(userId: number): Promise<UserResponseDto> {
    const user = await this.findUserById(userId);

    return new UserResponseDto(user);
  }

  /**
   * 유저 Id에 해당하는 유저 정보를 수정한다.
   *
   * @param {number} userId - 유저 Id
   * @param {UserUpdateRequestDto} requestDto - 유저 수정 Dto
   * @returns {Promise<User>}
   */
  async update(
    userId: number,
    requestDto: UserUpdateRequestDto,
  ): Promise<User> {
    const user = await this.findUserById(userId);
    const { firstName, lastName, isActive } = requestDto;

    user.update(firstName, lastName, isActive);

    return await this.userRepository.save(user);
  }

  /**
   * 유저 Id에 해당하는 유저 정보를 삭제한다.
   *
   * @param {number} userId - 유저 Id
   * @returns {Promise<void>}
   */
  async delete(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }

  /**
   * 유저 Id에 해당하는 유저 정보를 반환한다.
   *
   * @param {number} userId - 유저 Id
   * @returns {Promise<User>}
   */
  private async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOneByUserId(userId);

    if (isEmpty(user) === true) {
      throw new NotFoundException(UserMessage.NOT_FOUND_USER);
    }

    return user;
  }
}
