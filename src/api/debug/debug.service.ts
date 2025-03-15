import { Injectable } from '@nestjs/common';
import * as pprof from 'pprof';
import { perftools } from 'pprof/proto/profile';
import * as path from 'path';
import { writeFileSync } from 'fs';

@Injectable()
export class DebugService {
  /**
   * 기본 프로파일링 지속 시간(초)
   */
  private readonly DURATION_SECONDS: number = 30;

  /**
   * CPU 프로파일링을 시작하고 프로파일 데이터를 저장한다.
   *
   * @param {string} [seconds] - 프로파일링 지속 시간(초)
   * @returns {Promise<string>} - 프로파일링 완료 메시지 및 저장된 파일 경로
   */
  async startCpuProfiling(seconds?: string): Promise<string> {
    const durationMillis = this.parseSecondsToMillis(seconds);
    console.log(
      `Starting CPU profiling for ${durationMillis / 1_000} seconds...`,
    );

    try {
      const profile = await pprof.time.profile({ durationMillis });

      const fileName = `cpu-profile-${Date.now()}.pb.gz`;
      const filePath = await this.saveProfileToFile(profile, fileName);

      console.log(`CPU profiling completed. File saved: ${filePath}`);
      return `CPU profiling completed. File saved: ${filePath}`;
    } catch (error) {
      console.error('CPU profiling failed:', error);
      throw new Error('CPU profiling failed.');
    }
  }

  /**
   * 입력된 초(seconds)를 밀리초(ms)로 변환한다.
   * 유효하지 않은 값이 들어오면 기본값(30초)을 사용한다.
   *
   * @param {string} [seconds] - 변환할 초 단위 문자열
   * @returns {number} - 변환된 밀리초 값
   */
  private parseSecondsToMillis(seconds?: string): number {
    const parsedSeconds = seconds ? Number(seconds) : this.DURATION_SECONDS;
    if (isNaN(parsedSeconds) || parsedSeconds <= 0) {
      console.warn(
        `Invalid seconds value: "${seconds}", using default: ${this.DURATION_SECONDS}s`,
      );
      return this.DURATION_SECONDS * 1_000;
    }
    return parsedSeconds * 1_000;
  }

  /**
   * 프로파일 데이터를 지정된 파일로 저장한다.
   *
   * @param {perftools.profiles.IProfile} profile - 저장할 프로파일 데이터
   * @param {string} fileName - 저장할 파일 이름
   * @returns {Promise<string>} - 저장된 파일 경로
   */
  private async saveProfileToFile(
    profile: perftools.profiles.IProfile,
    fileName: string,
  ): Promise<string> {
    const filePath = path.join(process.cwd(), fileName);

    const profileData = await pprof.encode(profile);
    writeFileSync(filePath, profileData);

    return filePath;
  }
}
