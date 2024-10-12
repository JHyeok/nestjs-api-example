import { IsArray, IsString, ArrayNotEmpty, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderCreateRequestDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @ApiProperty({ description: '주문할 상품 번호' })
  productNumbers: string[];

  constructor(productNumbers: string[]) {
    this.productNumbers = productNumbers;
  }

  static of(productNumbers: string[]): OrderCreateRequestDto {
    return new OrderCreateRequestDto(productNumbers);
  }
}
