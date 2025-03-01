import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MySQLModule } from './database/mysql.module';
import { DebugModule } from './api/debug/debug.module';
import { HealthModule } from './api/health/health.module';
import { UserModule } from './api/user/user.module';
import { OrderModule } from './api/order/order.module';
import { AllExceptionFilter } from './common/filter/all-exception.filter';
import { NotFoundExceptionFilter } from './common/filter/not-found-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MySQLModule,
    DebugModule,
    HealthModule,
    UserModule,
    OrderModule,
  ],
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
