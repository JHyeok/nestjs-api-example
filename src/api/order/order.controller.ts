import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderCreateRequestDto } from './dto/request/order-create-request.dto';
import { OrderResponseDto } from './dto/response/order-response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({ version: '1', path: 'orders' })
@ApiTags('주문 API')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  /**
   * 주문 등록
   *
   * @remarks 이 작업을 통해 새로운 주문을 등록할 수 있습니다.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() requestDto: OrderCreateRequestDto,
  ): Promise<OrderResponseDto> {
    const now = new Date();

    return await this.orderService.create(requestDto, now);
  }
}
