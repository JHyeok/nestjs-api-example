import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from './order-status';
import { OrderProduct } from './order-product.entity';
import { Product } from './product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.READY,
  })
  orderStatus: OrderStatus;

  @Column({
    type: 'int',
    default: 0,
  })
  totalPrice: number;

  // TODO: createdDate
  @CreateDateColumn()
  registeredDateTime: Date;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  orderProducts: Relation<OrderProduct[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static create(products: Product[], registeredDateTime: Date): Order {
    const order = new Order();
    order.orderStatus = OrderStatus.READY;
    order.totalPrice = this.calculateTotalPrice(products);
    order.registeredDateTime = registeredDateTime;
    order.orderProducts = products.map((product) =>
      OrderProduct.create(order, product),
    );
    return order;
  }

  private static calculateTotalPrice(products: Product[]): number {
    return products.reduce((sum, product) => sum + product.price, 0);
  }
}
