import { Repository } from 'typeorm';
import { CustomRepository } from '../../../decorator/typeorm-ex.decorator';
import { OrderProduct } from '../domain/order-product.entity';

@CustomRepository(OrderProduct)
export class OrderProductRepository extends Repository<OrderProduct> {}