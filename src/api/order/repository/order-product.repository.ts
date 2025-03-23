import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { OrderProduct } from '../domain/order-product.entity';

@Injectable()
export class OrderProductRepository extends Repository<OrderProduct> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderProduct, dataSource.createEntityManager());
  }
}
