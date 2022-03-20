import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from 'src/api/health/health.service';

describe('HealthService', () => {
  let healthService: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    healthService = module.get<HealthService>(HealthService);
  });

  describe('Health Check', () => {
    it('OK가 반환된다', async () => {
      const existingResult: string = 'OK';

      const result = healthService.sendOk();

      expect(result).toBe(existingResult);
    });
  });
});
