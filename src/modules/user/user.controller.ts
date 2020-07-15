import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ description: '모든 User 조회' })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ description: 'User 생성' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ description: 'Id가 일치하는 User 정보 조회' })
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ description: 'User 삭제' })
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
