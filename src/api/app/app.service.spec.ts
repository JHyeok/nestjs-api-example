import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('Health Check', () => {
    it('OK를 반환한다.', async () => {
      const existingResult: string = 'OK';

      const result = appService.sendOk();

      expect(result).toBe(existingResult);
    });
  });
});
