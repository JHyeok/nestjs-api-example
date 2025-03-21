import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { setupApp, setupSwagger } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  setupApp(app);

  app.use(helmet());
  app.enableCors();

  setupSwagger(app);

  const port = configService.get<number>('APP_PORT');
  const env = configService.get<string>('NODE_ENV');
  await app.listen(port);

  console.info(`Server listening on port ${port} [${env}]`);
}

void bootstrap();
