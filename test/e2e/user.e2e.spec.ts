import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { UserRepository } from 'src/api/user/user.repository';
import { TypeOrmConfigService } from 'src/database/ormconfig.service';
import { AppModule } from 'src/app.module';
import { setupApp } from '../../src/config/common';

class MockTypeOrmConfigServer implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      dropSchema: true,
      entities: ['src/api/**/*.entity.ts'],
    };
  }
}

const mockTypeOrmConfigService = new MockTypeOrmConfigServer();

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TypeOrmConfigService)
      .useValue(mockTypeOrmConfigService)
      .compile();

    app = module.createNestApplication();
    userRepository = module.get<UserRepository>(UserRepository);

    setupApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  describe('GET /v1/users', () => {
    it('200(OK)과 생성된 모든 유저 목록을 json 타입으로 응답한다', async () => {
      await userRepository.save([
        { firstName: 'JaeHyeok', lastName: 'Kim' },
        { firstName: '재혁', lastName: '김' },
      ]);

      const res = await request(app.getHttpServer()).get('/v1/users');

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      const { body } = res;
      expect(body).toStrictEqual([
        {
          id: expect.any(Number),
          firstName: 'JaeHyeok',
          lastName: 'Kim',
          isActive: true,
        },
        {
          id: expect.any(Number),
          firstName: '재혁',
          lastName: '김',
          isActive: true,
        },
      ]);
    });
  });

  describe('POST /v1/users', () => {
    it('유저를 생성하고, 201(Created)과 유저를 응답한다', async () => {
      const firstName = 'JaeHyeok';
      const lastName = 'Kim';

      const res = await request(app.getHttpServer()).post('/v1/users').send({
        firstName: firstName,
        lastName: lastName,
      });

      expect(res.status).toBe(201);
      expect(res.type).toBe('application/json');
      const { body } = res;
      expect(body.firstName).toBe(firstName);
      expect(body.lastName).toBe(lastName);
      expect(body.isActive).toBe(true);
    });
  });
});
