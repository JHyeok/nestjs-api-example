import { validate } from 'class-validator';
import { OrderCreateRequestDto } from 'src/api/order/dto/request/order-create-request.dto';

describe('OrderCreateRequestDto', () => {
  describe('productNumbers 유효성 검사', () => {
    it('productNumbers가 없으면 유효하지 않다', async () => {
      const dto = OrderCreateRequestDto.of(undefined as any);

      const errors = await validate(dto);

      const error = errors.find((e) => e.property === 'productNumbers');
      expect(error).toBeDefined();
    });

    it('productNumbers가 빈 배열이면 유효하지 않다', async () => {
      const dto = OrderCreateRequestDto.of([]);

      const errors = await validate(dto);

      const error = errors.find((e) => e.property === 'productNumbers');
      expect(error).toBeDefined();
    });

    it('productNumbers 배열에 문자열이 아닌 요소가 있으면 유효하지 않다', async () => {
      const dto = OrderCreateRequestDto.of(['P0001', 123 as any, 'P0002']);

      const errors = await validate(dto);

      const error = errors.find((e) => e.property === 'productNumbers');
      expect(error).toBeDefined();
    });

    it('productNumbers 배열에 빈 문자열 요소가 있으면 유효하지 않다', async () => {
      const dto = OrderCreateRequestDto.of(['', 'P0001']);

      const errors = await validate(dto);

      const error = errors.find((e) => e.property === 'productNumbers');
      expect(error).toBeDefined();
    });
  });

  it('모든 필드가 유효하면 에러가 없다', async () => {
    const dto = OrderCreateRequestDto.of(['P0001', 'P0002']);

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });
});
