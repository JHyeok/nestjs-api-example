import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * 유저를 생성한다.
   *
   * @param {CreateUserDto} createUserDto - 유저 생성 Dto
   * @returns {Promise<CreateUserDto & User>}
   */
  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  /**
   * 모든 유저 정보를 조회한다.
   *
   * @returns {Promise<User[]>}
   */
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * 유저 Id에 해당하는 유저 정보를 조회한다.
   *
   * @param {string} id - 유저 Id
   * @returns {Promise<User>}
   */
  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  /**
   * 유저 Id에 해당하는 유저 정보를 수정한다.
   *
   * @param {string} id - 유저 Id
   * @param {UpdateUserDto} updateUserDto - 유저 수정 Dto
   * @returns {Promise<User>}
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userToUpdate) {
      throw new BadRequestException('존재하지 않는 유저 정보입니다.');
    }

    userToUpdate.firstName = updateUserDto.firstName;
    userToUpdate.lastName = updateUserDto.lastName;
    userToUpdate.isActive = updateUserDto.isActive;

    return await this.userRepository.save(userToUpdate);
  }

  /**
   * 유저 Id에 해당하는 유저 정보를 삭제한다.
   *
   * @param {string} id - 유저 Id
   * @returns {Promise<void>}
   */
  async removeUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
