import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * 테스트 MySQL 가져오기
 *
 * @returns {DynamicModule}
 */
export function getTestMysqlModule(): DynamicModule {
  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'test',
    entities: ['src/api/**/*.entity.ts'],
    synchronize: true,
  });
}
