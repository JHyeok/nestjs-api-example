import { Module } from '@nestjs/common';
import { AppController } from './api/app/app.controller';
import { AppService } from './api/app/app.service';
import { MySQLModule } from './database/mysql.module';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [MySQLModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
