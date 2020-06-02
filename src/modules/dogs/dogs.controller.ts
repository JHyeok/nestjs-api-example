/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Query, HttpCode, Redirect, Param, Body } from '@nestjs/common';
import { CreateDogDto } from './create-dog.dto';

@Controller('dogs')
export class DogsController {
  @Get()
  async findAll(): Promise<any[]> {
    return [];
  }

  @Post()
  @HttpCode(204)
  async create(@Body() createDogDto: CreateDogDto) {
    return 'This action adds a new dog';
  }


  @Get(':id')
  findOne(@Param('id') id): string {
    return `This action returns a #${id} dog`;
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
