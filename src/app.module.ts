import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { MySQLModule } from './database/mysql.module';
import { HealthModule } from './api/health/health.module';
import { UserModule } from './api/user/user.module';
import { OrderModule } from './api/order/order.module';
import { AllExceptionFilter } from './common/filter/all-exception.filter';
import { NotFoundExceptionFilter } from './common/filter/not-found-exception.filter';

@Module({
  imports: [MySQLModule, HealthModule, UserModule, OrderModule],
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
