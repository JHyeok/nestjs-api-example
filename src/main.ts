import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';
import helmet from 'helmet';
import { setupSwagger } from './utils/swagger';
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

  app.use(helmet());
  app.enableCors();

  setupSwagger(app);

  const port = configService.get('APP_PORT');
  await app.listen(port);

  console.info(`Server listening on port ${port}`);
}

void bootstrap();
