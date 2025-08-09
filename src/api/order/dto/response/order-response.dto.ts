import { ProductResponseDto } from './product-response.dto';
import { Order } from '../../domain/order.entity';
import { ApiProperty } from '@nestjs/swagger';

export class OrderResponseDto {
  @ApiProperty({ description: '주문 ID' })
  id: number;

  @ApiProperty({ description: '총 가격 (단위: 원)' })
  totalPrice: number;

  @ApiProperty({ description: '등록된 시간' })
  registeredDateTime: Date;

  @ApiProperty({ description: '주문된 상품 목록', type: [ProductResponseDto] })
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
