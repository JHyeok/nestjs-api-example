import { Repository } from 'typeorm';
import { CustomRepository } from '../../../common/decorator/typeorm-ex.decorator';
import { Order } from '../domain/order.entity';

@CustomRepository(Order)
export class OrderRepository extends Repository<Order> {}
