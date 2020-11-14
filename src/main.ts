import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './utils/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from './modules/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('/api/v1');

  app.use(helmet());
  app.enableCors();

  app.use(
    '/api/v1',
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 100,
    }),
  );

  app.use(compression());

  setupSwagger(app);

  const port = configService.get('APP_PORT');
  await app.listen(port);

  console.info(`Server listening on port ${port}`);
}

void bootstrap();
