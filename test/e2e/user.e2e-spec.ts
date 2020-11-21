import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserRepository } from '../../src/modules/user/user.repository';
import { TypeOrmConfigService } from '../../src/database/ormconfig.service';
import { AppModule } from '../../src/modules/main/app.module';

class MockTypeOrmConfigServer implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      dropSchema: true,
      entities: ['src/modules/**/*.entity{.ts,.js}'],
    };
  }
}

const mockTypeOrmConfigService = new MockTypeOrmConfigServer();

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TypeOrmConfigService)
      .useValue(mockTypeOrmConfigService)
      .compile();

    app = moduleFixture.createNestApplication();
    userRepository = moduleFixture.get<UserRepository>(UserRepository);
    await app.init();
  });

  describe('GET /api/v1/users', () => {
    it('유저 목록을 반환한다.', async () => {
      await userRepository.save([
        { firstName: 'first-1', lastName: 'last-2' },
        { firstName: 'first-2', lastName: 'last-2' },
      ]);

      const { body } = await request(app.getHttpServer())
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(body).toEqual([
        {
          id: expect.any(Number),
          firstName: 'first-1',
          lastName: 'last-2',
          isActive: true,
        },
        {
          id: expect.any(Number),
          firstName: 'first-2',
          lastName: 'last-2',
          isActive: true,
        },
      ]);
    });
  });
});
