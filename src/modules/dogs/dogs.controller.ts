// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Controller,
  Get,
  Post,
  HttpCode,
  Param,
  Body,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { DogsService } from './dogs.service';
import { Dog } from './interfaces/dog.interface';
import { Roles } from 'src/common/guards/role.decorator';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
// import { Car } from 'src/common/guards/post.decorator';
// import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';

// 해당 컨트롤러에 Interceptor 적용
// @UseInterceptors(new LoggingInterceptor())
@Controller('dogs')
@ApiTags('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Get()
  @ApiOperation({ description: '모든 Dog 조회' })
  async findAll(): Promise<Dog[]> {
    return this.dogsService.findAll();
  }

  @Post()
  @HttpCode(201)
  @Roles('admin')
  @ApiOperation({ description: 'Dog 생성' })
  async create(@Body(new ValidationPipe()) createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  /*
  ValidationPipe
  ParseIntPipe
  ParseBoolPipe
  ParseArrayPipe
  ParseUUIDPipe
  DefaultValuePipe
  */
  @Get(':id')
  @ApiOperation({ description: 'Id가 일치하는 Dog 정보 조회' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe를 사용할 경우, 매개변수가 number 형식이 아니라면
    // {"statusCode":400,"message":"Validation failed (numeric string is expected)","error":"Bad Request"} 의 오류를 발생
    return this.dogsService.findOne(id);
  }

  /*
  Custom route decorators
  @Get(':id')
  async findOne(@Car('name') name: string) {
    console.log(`Hello ${name}`);
  }
  */

  /*
  @Get(':id')
  findOne(@Param('id') id): string {
    throw new HttpException('Custom message', HttpStatus.FORBIDDEN);
  }

  @Get(':id/docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return {
        url: 'https://docs.nestjs.com/v5/'
      }
    }
  }
  */
}
