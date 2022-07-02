import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HealthModule } from 'src/api/health/health.module';
import { MySQLModule } from 'src/database/mysql.module';
import { UserModule } from 'src/api/user/user.module';
import { AllExceptionFilter } from './filter/all-exception.filter';
import { NotFoundExceptionFilter } from './filter/not-found-exception.filter';

@Module({
  imports: [HealthModule, MySQLModule, UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
  ],
})
export class AppModule {}
