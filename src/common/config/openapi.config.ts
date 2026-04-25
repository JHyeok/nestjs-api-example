import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

/**
 * OpenAPI 문서 생성 및 문서 UI 설정
 *
 * @param {INestApplication} app
 */
export async function setupOpenApi(app: INestApplication): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('NestJS Study API Docs')
    .setDescription('NestJS Study API description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.use(
    '/reference',
    apiReference({
      cdn: 'https://cdn.jsdelivr.net/npm/@scalar/api-reference@1.52.3',
      content: document,
      theme: 'purple',
    }),
  );
}
