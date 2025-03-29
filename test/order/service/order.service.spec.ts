import { DataSource } from 'typeorm';
import { Test } from '@nestjs/testing';
import { OrderModule } from 'src/api/order/order.module';
import { TestMySQLModule } from '../../test-mysql.module';
import { OrderService } from 'src/api/order/order.service';
import { ProductRepository } from 'src/api/order/repository/product.repository';
import { OrderCreateRequestDto } from 'src/api/order/dto/request/order-create-request.dto';
import { OrderRepository } from 'src/api/order/repository/order.repository';
import { ProductType } from 'src/api/order/domain/product-type';
import { OrderProductRepository } from 'src/api/order/repository/order-product.repository';
import { ProductFixture } from '../../fixture/product.fixture';

describe('OrderService (Integration)', () => {
  let sut: OrderService;
  let dataSource: DataSource;
  let productRepository: ProductRepository;
  let orderRepository: OrderRepository;
  let orderProductRepository: OrderProductRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [OrderModule, TestMySQLModule],
      providers: [
        OrderService,
        ProductRepository,
        OrderRepository,
        OrderProductRepository,
      ],
    }).compile();

    sut = module.get(OrderService);
    dataSource = module.get(DataSource);
    productRepository = module.get(ProductRepository);
    orderRepository = module.get(OrderRepository);
    orderProductRepository = module.get(OrderProductRepository);
  });

  beforeEach(async () => {
    await orderProductRepository.clear();
    await orderRepository.clear();
    await productRepository.clear();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('create', () => {
    it('주문번호 리스트를 받아 주문을 생성한다', async () => {
      // given
      const now = new Date();
      await productRepository.save(
        ProductFixture.create('P0001', ProductType.GENERAL, 1_000),
      );
      await productRepository.save(
        ProductFixture.create('P0002', ProductType.GENERAL, 3_000),
      );
      const request = OrderCreateRequestDto.of(['P0001', 'P0002']);

      // when
      const orderResponse = await sut.create(request, now);

      // then
      expect(orderResponse.id).not.toBeNull();
      expect(orderResponse).toMatchObject({
        totalPrice: 4_000,
        registeredDateTime: now,
      });
      expect(orderResponse.products).toHaveLength(2);
      expect(orderResponse.products).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ productNumber: 'P0001', price: 1_000 }),
          expect.objectContaining({ productNumber: 'P0002', price: 3_000 }),
        ]),
      );
    });
  });
});
