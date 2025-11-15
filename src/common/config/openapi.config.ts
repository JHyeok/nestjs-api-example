import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * OpenAPI 문서 생성 및 문서 UI 설정
 *
 * @param {INestApplication} app
 */
export async function setupOpenApi(app: INestApplication): Promise<void> {
  const options = new DocumentBuilder()
    .setTitle('NestJS Study API Docs')
    .setDescription('NestJS Study API description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const { apiReference } = await import('@scalar/nestjs-api-reference');

  app.use(
    '/reference',
    apiReference({
      content: document,
      theme: 'purple',
    }),
  );
}
