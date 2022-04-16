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
import { UserService } from 'src/api/user/user.service';
import { User } from 'src/api/user/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { UserCreateRequestDto } from 'src/api/user/dto/user-create-request.dto';
import { UserUpdateRequestDto } from 'src/api/user/dto/user-update-request.dto';
import { UserResponseDto } from 'src/api/user/dto/user-response.dto';

@Controller('v1/users')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '모든 유저 조회 API' })
  @ApiOkResponse({ description: '모든 유저를 조회한다.', type: User })
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();

    return res.status(HttpStatus.OK).json(users);
  }

  @Post()
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiCreatedResponse({ description: '유저를 생성한다.', type: User })
  async create(@Body() requestDto: UserCreateRequestDto, @Res() res: Response) {
    const user = await this.userService.createUser(requestDto);

    return res.status(HttpStatus.CREATED).json(user);
  }

  @Get(':id')
  @ApiOperation({ summary: '유저 정보 조회 API' })
  @ApiOkResponse({
    description: 'Id가 일치하는 유저 정보를 조회한다.',
    type: UserResponseDto,
  })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const responseDto = await this.userService.findById(id);

    return res.status(HttpStatus.OK).json(responseDto);
  }

  @Put(':id')
  @ApiOperation({ summary: '유저 정보 수정 API' })
  @ApiOkResponse({
    description: 'Id가 일치하는 유저 정보를 수정한다.',
    type: User,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() requestDto: UserUpdateRequestDto,
    @Res() res: Response,
  ) {
    const updatedUser = await this.userService.updateUser(id, requestDto);

    return res.status(HttpStatus.OK).json(updatedUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: '유저 삭제 API' })
  @ApiNoContentResponse({ description: 'Id가 일치하는 유저 정보를 삭제한다.' })
  async delete(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    await this.userService.deleteUser(id);

    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
