import { ProductResponseDto } from './product-response.dto';
import { Order } from '../../domain/order.entity';

export class OrderResponseDto {
  /** 주문 ID */
  id: number;

  /** 총 가격 (단위: 원) */
  totalPrice: number;

  /** 등록된 시간 */
  registeredDateTime: Date;

  /** 주문된 상품 목록 */
  products: ProductResponseDto[];

  constructor(
    id: number,
    totalPrice: number,
    registeredDateTime: Date,
    products: ProductResponseDto[],
  ) {
    this.id = id;
    this.totalPrice = totalPrice;
    this.registeredDateTime = registeredDateTime;
    this.products = products;
  }

  static of(order: Order): OrderResponseDto {
    return new OrderResponseDto(
      order.id,
      order.totalPrice,
      order.registeredDateTime,
      order.orderProducts.map((orderProduct) =>
        ProductResponseDto.of(orderProduct.product),
      ),
    );
  }

  /*
  static of(order: Order): OrderResponseDto {
    const response = new OrderResponseDto();
    response.id = order.id;
    response.totalPrice = order.totalPrice;
    response.registeredDateTime = order.registeredDateTime;
    response.products = order.orderProducts.map((orderProduct) =>
      ProductResponseDto.of(orderProduct.product),
    );

    return response;
  }
   */
}
