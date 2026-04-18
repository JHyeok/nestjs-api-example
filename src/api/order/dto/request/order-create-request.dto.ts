import { IsArray, IsString, ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class OrderCreateRequestDto {
  /** 주문할 상품 번호 */
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  productNumbers: string[];

  constructor(productNumbers: string[]) {
    this.productNumbers = productNumbers;
  }

  static of(productNumbers: string[]): OrderCreateRequestDto {
    return new OrderCreateRequestDto(productNumbers);
  }
}
