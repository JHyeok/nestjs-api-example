import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DebugController } from 'src/api/debug/debug.controller';
import { DebugService } from 'src/api/debug/debug.service';
import { mock, mockReset } from 'jest-mock-extended';
import { setupApp } from 'src/common/config';

describe('DebugController (e2e)', () => {
  let app: INestApplication;
  const debugService = mock<DebugService>();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [DebugController],
      providers: [{ provide: DebugService, useValue: debugService }],
    }).compile();

    app = module.createNestApplication();
    setupApp(app);
    await app.init();
  });

  beforeEach(() => {
    mockReset(debugService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /debug/pprof/profile', () => {
    it('CPU 프로파일링을 시작하고 파일명을 응답한다', async () => {
      // given
      const fileName = 'cpu-profile-1740188574460.pb.gz';
      const expectedResponse = `CPU profiling completed. File saved: ${fileName}`;
      debugService.startCpuProfiling.mockResolvedValue(expectedResponse);

      // when
      const res = await request(app.getHttpServer()).get(
        '/debug/pprof/profile?seconds=15',
      );

      // then
      expect(res.status).toBe(HttpStatus.OK);
      expect(res.text).toBe(expectedResponse);
    });
  });
});
