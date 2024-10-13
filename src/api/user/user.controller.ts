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
import { User } from './domain/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { UserCreateRequestDto } from './dto/request/user-create-request.dto';
import { UserUpdateRequestDto } from './dto/request/user-update-request.dto';
import { UserResponseDto } from './dto/response/user-response.dto';
import { UserNameResponseDto } from './dto/response/user-name-response.dto';

@Controller({ version: '1', path: 'users' })
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '모든 유저 조회' })
  @ApiOkResponse({ description: '모든 유저를 조회한다.', type: User })
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();

    return res.status(HttpStatus.OK).json(users);
  }

  @Get('/name')
  @ApiOperation({ summary: '유저 이름 조회' })
  @ApiOkResponse({ type: UserNameResponseDto })
  findName(): UserNameResponseDto {
    const user = User.create('JaeHyeok', 'Kim');

    // return UserNameResponseDto.of(user);
    return new UserNameResponseDto(user);
  }

  @Post()
  @ApiOperation({ summary: '유저 생성', description: '유저를 생성한다.' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  async create(@Body() requestDto: UserCreateRequestDto, @Res() res: Response) {
    const user = await this.userService.create(requestDto);

    return res.status(HttpStatus.CREATED).json(user);
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiOkResponse({
    description: 'Id가 일치하는 유저 정보를 조회한다.',
    type: UserResponseDto,
  })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const responseDto = await this.userService.findById(id);

    return res.status(HttpStatus.OK).json(instanceToPlain(responseDto));
  }

  @Put(':id')
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiOkResponse({
    description: 'Id가 일치하는 유저 정보를 수정한다.',
    type: User,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() requestDto: UserUpdateRequestDto,
    @Res() res: Response,
  ) {
    const updatedUser = await this.userService.update(id, requestDto);

    return res.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: '유저 삭제' })
  @ApiNoContentResponse({ description: 'Id가 일치하는 유저 정보를 삭제한다.' })
  async delete(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    await this.userService.delete(id);

    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
