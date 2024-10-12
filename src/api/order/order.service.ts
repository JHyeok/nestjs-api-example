import { Injectable } from '@nestjs/common';
import { OrderCreateRequestDto } from './dto/request/order-create-request.dto';
import { ProductRepository } from './repository/product.repository';
import { Order } from './domain/order.entity';
import { OrderRepository } from './repository/order.repository';
import { OrderResponseDto } from './dto/response/order-response.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  /**
   * 주문을 생성한다.
   *
   * @param {OrderCreateRequestDto} requestDto - OrderCreateRequest
   * @param {Date} now - 현재 시간
   *
   * @returns {Promise<OrderResponseDto>}
   */
  async create(
    requestDto: OrderCreateRequestDto,
    now: Date,
  ): Promise<OrderResponseDto> {
    const productNumbers = requestDto.productNumbers;
    const products = await this.productRepository.findAllByProductNumberIn(
      productNumbers,
    );

    const order = Order.create(products, now);
    const savedOrder = await this.orderRepository.save(order);
    return OrderResponseDto.of(savedOrder);
  }
}
