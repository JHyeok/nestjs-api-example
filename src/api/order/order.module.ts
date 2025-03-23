import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ProductRepository } from './repository/product.repository';
import { OrderRepository } from './repository/order.repository';
import { OrderProductRepository } from './repository/order-product.repository';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    ProductRepository,
    OrderRepository,
    OrderProductRepository,
  ],
})
export class OrderModule {}
