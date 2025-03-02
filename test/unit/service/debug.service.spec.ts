import { Test } from '@nestjs/testing';
import { DebugService } from 'src/api/debug/debug.service';
import * as pprof from 'pprof';
import { writeFileSync } from 'fs';
import { perftools } from 'pprof/proto/profile';

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
}));

jest.mock('pprof', () => ({
  time: {
    profile: jest.fn(),
  },
  encode: jest.fn(),
}));

describe('DebugService', () => {
  let debugService: DebugService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DebugService],
    }).compile();

    debugService = module.get(DebugService);
  });

  describe('startCpuProfiling', () => {
    it('입력값이 없으면 기본값(30초)을 사용하여 프로파일링을 실행한다', async () => {
      const mockProfile = {} as perftools.profiles.IProfile;
      jest.mocked(pprof.time.profile).mockResolvedValue(mockProfile);
      jest
        .mocked(pprof.encode)
        .mockResolvedValue(Buffer.from('mocked-profile'));

      await debugService.startCpuProfiling();

      expect(pprof.time.profile).toHaveBeenCalledWith({
        durationMillis: 30000,
      });
    });

    it('입력된 초를 밀리초로 변환하여 프로파일링을 실행한다', async () => {
      const mockProfile = {} as perftools.profiles.IProfile;
      jest.mocked(pprof.time.profile).mockResolvedValue(mockProfile);
      jest
        .mocked(pprof.encode)
        .mockResolvedValue(Buffer.from('mocked-profile'));

      await debugService.startCpuProfiling('10');

      expect(pprof.time.profile).toHaveBeenCalledWith({
        durationMillis: 10000,
      });
    });

    it('잘못된 입력값이 들어오면 기본값(30초)으로 프로파일링을 실행한다', async () => {
      const mockProfile = {} as perftools.profiles.IProfile;
      jest.mocked(pprof.time.profile).mockResolvedValue(mockProfile);
      jest
        .mocked(pprof.encode)
        .mockResolvedValue(Buffer.from('mocked-profile'));

      await debugService.startCpuProfiling('abc');

      expect(pprof.time.profile).toHaveBeenCalledWith({
        durationMillis: 30000,
      });
    });

    it('CPU 프로파일링을 시작하고 파일 저장 후 성공 메시지를 반환한다', async () => {
      const mockProfile = {} as perftools.profiles.IProfile;
      jest.mocked(pprof.time.profile).mockResolvedValue(mockProfile);
      jest
        .mocked(pprof.encode)
        .mockResolvedValue(Buffer.from('mocked-profile'));

      const result = await debugService.startCpuProfiling('10');

      expect(pprof.time.profile).toHaveBeenCalledWith({
        durationMillis: 10000,
      });
      expect(pprof.encode).toHaveBeenCalledWith(mockProfile);
      expect(writeFileSync).toHaveBeenCalled();
      expect(result).toContain('CPU profiling completed. File saved:');
    });

    it('CPU 프로파일링이 실패하면 예외를 던진다', async () => {
      jest
        .mocked(pprof.time.profile)
        .mockRejectedValue(new Error('Profiling failed'));

      await expect(debugService.startCpuProfiling('10')).rejects.toThrow(
        'CPU profiling failed.',
      );
    });
  });
});
