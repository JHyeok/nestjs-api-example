import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

/**
 * App 세팅
 *
 * @param {INestApplication} app
 */
export function setupApp(app: INestApplication): void {
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const error = errors.map((e) => ({
          [e.property]: e.constraints,
        }));
        return new BadRequestException(error);
      },
    }),
  );
}
