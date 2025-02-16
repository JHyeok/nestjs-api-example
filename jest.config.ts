import type { Config } from 'jest';

const config: Config = {
  // 기본 환경 설정
  rootDir: '.',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],

  // 테스트 파일 탐색 및 변환 설정
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc-node/jest',
  },

  // 모듈 및 경로 매핑 설정
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },

  // 커버리지 설정
  coverageDirectory: './coverage',

  // 실행 관련 설정
  verbose: true,
  testTimeout: 30000,
};

export default config;
