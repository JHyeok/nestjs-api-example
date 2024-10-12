import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmExModule } from '../../database/typeorm-ex.module';
import { ProductRepository } from './repository/product.repository';
import { OrderRepository } from './repository/order.repository';
import { OrderProductRepository } from './repository/order-product.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      ProductRepository,
      OrderRepository,
      OrderProductRepository,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
