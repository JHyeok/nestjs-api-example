import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Order } from '../domain/order.entity';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private readonly dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
}
