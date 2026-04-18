import { Product } from '../../domain/product.entity';

export class ProductResponseDto {
  /** 상품 번호 */
  productNumber: string;

  /** 상품 가격 */
  price: number;

  constructor(productNumber: string, price: number) {
    this.productNumber = productNumber;
    this.price = price;
  }

  static of(product: Product): ProductResponseDto {
    return new ProductResponseDto(product.productNumber, product.price);
  }
}
