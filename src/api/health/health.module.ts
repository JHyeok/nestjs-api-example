import { Module } from '@nestjs/common';
import { HealthController } from 'src/api/health/health.controller';
import { HealthService } from 'src/api/health/health.service';

@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
