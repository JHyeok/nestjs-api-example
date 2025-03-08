import { ProductType } from 'src/api/order/domain/product-type';
import { Product } from 'src/api/order/domain/product.entity';
import { ProductSaleStatus } from 'src/api/order/domain/product-sale-status';

export class ProductFixture {
  static create(
    productNumber: string,
    type: ProductType,
    price: number,
    name: string = '상품 이름',
  ) {
    return Product.of(productNumber, type, ProductSaleStatus.ON, name, price);
  }
}
