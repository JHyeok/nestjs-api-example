import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'test',
        password: 'test',
        database: 'test',
        entities: ['src/api/**/*.entity.ts'],
        synchronize: true,
        logging: false,
      }),
    }),
  ],
})
export class TestMySQLModule {}
