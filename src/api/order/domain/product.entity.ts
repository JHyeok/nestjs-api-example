import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
} from 'typeorm';
import { ProductType } from './product-type';
import { ProductSaleStatus } from './product-sale-status';
import { OrderProduct } from './order-product.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productNumber: string;

  @Column({
    type: 'enum',
    enum: ProductType,
  })
  type: ProductType;

  @Column({
    type: 'enum',
    enum: ProductSaleStatus,
  })
  saleStatus: ProductSaleStatus;

  @Column()
  name: string;

  @Column({
    type: 'int',
    default: 0,
  })
  price: number;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: Relation<OrderProduct[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static of(
    productNumber: string,
    type: ProductType,
    status: ProductSaleStatus,
    name: string,
    price: number,
  ): Product {
    const product = new Product();
    product.productNumber = productNumber;
    product.type = type;
    product.saleStatus = status;
    product.name = name;
    product.price = price;
    return product;
  }
}
