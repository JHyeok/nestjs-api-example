import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { UserRepository } from 'src/api/user/repository/user.repository';
import { AppModule } from 'src/app.module';
import { TestMySQLModule } from '../test-mysql.module';
import { setupApp } from 'src/common/config';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, TestMySQLModule],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get(UserRepository);

    setupApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /v1/users', () => {
    it('200(OK)과 생성된 모든 유저 목록을 json 타입으로 응답한다', async () => {
      await userRepository.save([
        { firstName: 'JaeHyeok', lastName: 'Kim' },
        { firstName: '재혁', lastName: '김' },
      ]);

      const res = await request(app.getHttpServer()).get('/v1/users');

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.type).toBe('application/json');
      const { body } = res;
      expect(body).toHaveLength(2);
      expect(body[0].firstName).toBe('JaeHyeok');
      expect(body[0].lastName).toBe('Kim');
      expect(body[1].firstName).toBe('재혁');
      expect(body[1].lastName).toBe('김');
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

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.type).toBe('application/json');
      const { body } = res;
      expect(body.firstName).toBe(firstName);
      expect(body.lastName).toBe(lastName);
      expect(body.isActive).toBe(true);
    });
  });

  describe('GET /v1/users/name', () => {
    it('유저 이름을 응답한다', async () => {
      const res = await request(app.getHttpServer()).get('/v1/users/name');

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.type).toBe('application/json');
      const { body } = res;
      expect(body.name).toBe('Kim JaeHyeok');
    });
  });
});
