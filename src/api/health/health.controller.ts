import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthService } from './health.service';

@Controller('health')
@ApiTags('서버 상태 확인 API')
export class HealthController {
  constructor(private readonly appService: HealthService) {}

  @Get()
  @ApiOperation({ description: 'Health Check' })
  healthCheck(@Res() res: Response) {
    const result = this.appService.sendOk();

    return res.status(HttpStatus.OK).send(result);
  }
}
