import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Body,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('v1/users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ description: '모든 User 조회' })
  findAll(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ description: 'User 생성' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ description: 'Id가 일치하는 User 정보 조회' })
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ description: 'User 정보 수정' })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'User 삭제' })
  remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.userService.removeUser(id);
  }
}
