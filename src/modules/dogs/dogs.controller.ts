/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Query, HttpCode, Redirect, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { DogsService } from './dogs.service';
import { Dog } from './interfaces/dog.interface';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Get()
  async findAll(): Promise<Dog[]> {
    return this.dogsService.findAll();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }


  @Get(':id')
  findOne(@Param('id') id): string {
    throw new HttpException('Custom message', HttpStatus.FORBIDDEN);
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return {
        url: 'https://docs.nestjs.com/v5/'
      }
    }
  }
}
