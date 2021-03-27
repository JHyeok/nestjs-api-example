import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  ParseIntPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
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
  async findAll(@Res() res: Response) {
    const users: User[] = await this.userService.getUsers();

    return res.status(HttpStatus.OK).json(users);
  }

  @Post()
  @ApiOperation({ description: 'User 생성' })
  async create(@Body() requestDto: UserCreateRequestDto, @Res() res: Response) {
    const user: User = await this.userService.createUser(requestDto);

    return res.status(HttpStatus.CREATED).json(user);
  }

  @Get(':id')
  @ApiOperation({ description: 'Id가 일치하는 User 정보 조회' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const user: User = await this.userService.getUserById(id);

    return res.status(HttpStatus.OK).json(new UserResponseDto(user));
  }

  @Put(':id')
  @ApiOperation({ description: 'User 정보 수정' })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() requestDto: UserUpdateRequestDto,
    @Res() res: Response,
  ) {
    const updatedUser: User = await this.userService.updateUser(id, requestDto);

    return res.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete(':id')
  @ApiOperation({ description: 'User 삭제' })
  async remove(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    await this.userService.removeUser(id);

    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
