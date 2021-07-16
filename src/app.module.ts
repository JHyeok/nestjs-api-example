import { Module } from '@nestjs/common';
import { AppController } from 'src/api/app/app.controller';
import { AppService } from 'src/api/app/app.service';
import { MySQLModule } from 'src/database/mysql.module';
import { UserModule } from 'src/api/user/user.module';

@Module({
  imports: [MySQLModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
