import { Module } from '@nestjs/common';
import { HealthModule } from 'src/api/health/health.module';
import { MySQLModule } from 'src/database/mysql.module';
import { UserModule } from 'src/api/user/user.module';

@Module({
  imports: [HealthModule, MySQLModule, UserModule],
})
export class AppModule {}
