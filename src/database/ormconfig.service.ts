import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const isDevelopment =
      this.configService.get<string>('NODE_ENV') === 'development';

    return {
      type: 'mysql',
      host: this.configService.getOrThrow('DB_HOST'),
      port: this.configService.get<number>('DB_PORT', 3306),
      username: this.configService.getOrThrow('DB_USERNAME'),
      password: this.configService.getOrThrow('DB_PASSWORD'),
      database: this.configService.getOrThrow('DB_NAME'),
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: isDevelopment,
      logging: isDevelopment,
      poolSize: this.configService.get<number>('DB_POOL_SIZE', 10),
    };
  }
}
