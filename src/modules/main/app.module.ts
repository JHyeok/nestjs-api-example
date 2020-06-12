import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserHttpModule } from '../users/users-http.module'
import { DogsModule } from '../dogs/dogs.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), UserHttpModule, DogsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // Interceptor 모든 모듈에 적용
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
