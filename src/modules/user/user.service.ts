import { Injectable } from '@nestjs/common';
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
   * @param createUserDto 유저 생성 DTO
   */
  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  /**
   * 모든 유저 정보를 조회한다.
   */
  async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * 유저 정보를 조회한다.
   * @param id 유저 Id
   */
  async getUserById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  /**
   * 유저 정보를 수정한다.
   * @param id 유저 Id
   * @param updateUserDto 유저 수정 DTO
   */
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.userRepository.findOne(id);

    if (userToUpdate) {
      userToUpdate.firstName = updateUserDto.firstName;
      userToUpdate.lastName = updateUserDto.lastName;
      userToUpdate.isActive = updateUserDto.isActive;

      return await this.userRepository.save(userToUpdate);
    } else {
      return null;
    }
  }

  /**
   * 유저를 삭제한다.
   * @param id 유저 Id
   */
  async removeUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
