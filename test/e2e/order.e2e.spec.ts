import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { TestMySQLModule } from '../test-mysql.module';
import { setupApp } from 'src/common/config';
import { ProductRepository } from 'src/api/order/repository/product.repository';
import { ProductType } from 'src/api/order/domain/product-type';
import { OrderRepository } from 'src/api/order/repository/order.repository';
import { OrderProductRepository } from 'src/api/order/repository/order-product.repository';
import { ProductFixture } from '../fixture/product.fixture';

describe('OrderController (e2e)', () => {
  let app: INestApplication;
  let productRepository: ProductRepository;
  let orderRepository: OrderRepository;
  let orderProductRepository: OrderProductRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule, TestMySQLModule],
    }).compile();

    app = module.createNestApplication();
    productRepository = module.get(ProductRepository);
    orderRepository = module.get(OrderRepository);
    orderProductRepository = module.get(OrderProductRepository);

    setupApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await orderProductRepository.clear();
    await orderRepository.clear();
    await productRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /v1/orders', () => {
    it('주문을 등록하고, 주문 정보를 응답한다', async () => {
      await productRepository.save(
        ProductFixture.create('P0001', ProductType.GENERAL, 1000),
      );
      await productRepository.save(
        ProductFixture.create('P0002', ProductType.GENERAL, 3000),
      );

      const res = await request(app.getHttpServer())
        .post('/v1/orders')
        .send({
          productNumbers: ['P0001', 'P0002'],
        });

      expect(res.status).toBe(HttpStatus.CREATED);
      const { body } = res;
      expect(body.id).not.toBeNull();
      expect(body.totalPrice).toEqual(4000);
      expect(body.registeredDateTime).not.toBeNull();
      expect(body.products).toEqual([
        { productNumber: 'P0001', price: 1000 },
        { productNumber: 'P0002', price: 3000 },
      ]);
    });
  });
});
