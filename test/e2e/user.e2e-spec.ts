import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { UserRepository } from 'src/api/user/user.repository';
import { TypeOrmConfigService } from 'src/database/ormconfig.service';
import { AppModule } from 'src/app.module';

class MockTypeOrmConfigServer implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      dropSchema: true,
      entities: ['src/api/**/*.entity{.ts,.js}'],
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

  beforeEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await getConnection().close();
  });

  describe('GET /v1/users', () => {
    it('모든 유저 목록이 반환된다', async () => {
      await userRepository.save([
        { firstName: 'JaeHyeok', lastName: 'Kim' },
        { firstName: '재혁', lastName: '김' },
      ]);

      const response = await request(app.getHttpServer()).get('/v1/users');

      expect(response.status).toBe(200);
      const { body } = response;
      expect(body).toEqual([
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
    it('유저를 생성한다', async () => {
      const firstName = 'JaeHyeok';
      const lastName = 'Kim';

      const response = await request(app.getHttpServer())
        .post('/v1/users')
        .send({
          firstName: firstName,
          lastName: lastName,
        });

      expect(response.status).toBe(201);
      const { body } = response;
      expect(body.firstName).toBe(firstName);
      expect(body.lastName).toBe(lastName);
      expect(body.isActive).toBe(true);
    });
  });
});
