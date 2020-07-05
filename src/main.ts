import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './utils/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.use(helmet());
  app.enableCors();

  // 1분 동안 들어오는 요청의 수를 100개로 제한
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 100,
    }),
  );

  setupSwagger(app);

  await app.listen(3000);
}

bootstrap();
