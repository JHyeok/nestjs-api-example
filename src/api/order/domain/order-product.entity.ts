import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Relation,
  JoinColumn,
  Index,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
@Index('idx_order_product_orderId', ['order'])
@Index('idx_order_product_productId', ['product'])
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderProducts, {
    createForeignKeyConstraints: false,
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
  order: Relation<Order>;

  @ManyToOne(() => Product, (product) => product.orderProducts, {
    createForeignKeyConstraints: false,
    nullable: false,
    eager: false,
  })
  @JoinColumn({ name: 'productId', referencedColumnName: 'id' })
  product: Relation<Product>;

  static create(order: Order, product: Product): OrderProduct {
    const orderProduct = new OrderProduct();
    orderProduct.order = order;
    orderProduct.product = product;
    return orderProduct;
  }
}
