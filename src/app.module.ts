import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MySQLModule } from './database/mysql.module';
import { HealthModule } from './api/health/health.module';
import { UserModule } from './api/user/user.module';
import { AllExceptionFilter } from './filter/all-exception.filter';
import { NotFoundExceptionFilter } from './filter/not-found-exception.filter';

@Module({
  imports: [MySQLModule, HealthModule, UserModule],
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
