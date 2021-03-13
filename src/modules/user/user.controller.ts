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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserCreateRequestDto } from './dto/user-create-request.dto';
import { UserUpdateRequestDto } from './dto/user-update-request.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('v1/users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ description: '모든 User 조회' })
  findAll(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post()
  @HttpCode(201)
  @ApiOperation({ description: 'User 생성' })
  create(@Body() requestDto: UserCreateRequestDto): Promise<User> {
    return this.userService.createUser(requestDto);
  }

  @Get(':id')
  @ApiOperation({ description: 'Id가 일치하는 User 정보 조회' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<UserResponseDto> {
    const user: User = await this.userService.getUserById(id);

    return new UserResponseDto(user);
  }

  @Put(':id')
  @ApiOperation({ description: 'User 정보 수정' })
  update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() requestDto: UserUpdateRequestDto,
  ): Promise<User> {
    return this.userService.updateUser(id, requestDto);
  }

  @Delete(':id')
  @ApiOperation({ description: 'User 삭제' })
  remove(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
    return this.userService.removeUser(id);
  }
}
