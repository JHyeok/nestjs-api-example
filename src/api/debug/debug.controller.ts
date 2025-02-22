import { Controller, Get, Query } from '@nestjs/common';
import { DebugService } from './debug.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('debug')
@ApiTags('Debug')
export class DebugController {
  constructor(private readonly debugService: DebugService) {}

  @Get('/pprof/profile')
  @ApiOperation({
    summary: 'CPU 프로파일링 시작',
    description:
      '지정된 시간 동안 CPU 프로파일을 수집하고(기본값: 30초), 파일로 저장한다.',
  })
  async startProfiling(@Query('seconds') seconds?: string): Promise<string> {
    return this.debugService.startCpuProfiling(seconds);
  }
}
