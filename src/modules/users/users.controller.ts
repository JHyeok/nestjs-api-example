import { Controller, Get, Post, HttpCode, Param, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('api/users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ description: '모든 User 조회' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ description: 'User 생성' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ description: 'Id가 일치하는 User 정보 조회' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ description: 'User 삭제' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
