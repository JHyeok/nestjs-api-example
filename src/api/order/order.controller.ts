import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderCreateRequestDto } from './dto/request/order-create-request.dto';
import { OrderResponseDto } from './dto/response/order-response.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';

@Controller({ version: '1', path: 'orders' })
@ApiTags('주문 API')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '주문 등록' })
  @ApiCreatedResponse({
    description: '주문이 성공적으로 등록되었다.',
    type: OrderResponseDto,
  })
  async create(
    @Body() requestDto: OrderCreateRequestDto,
  ): Promise<OrderResponseDto> {
    const now = new Date();

    return await this.orderService.create(requestDto, now);
  }
}
