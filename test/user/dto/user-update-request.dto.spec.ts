import { validate } from 'class-validator';
import { UserUpdateRequestDto } from 'src/api/user/dto/request/user-update-request.dto';

describe('UserUpdateRequestDto', () => {
  describe('firstName 유효성 검사', () => {
    it('firstName이 없으면 유효하지 않다', async () => {
      const dto = UserUpdateRequestDto.of(undefined as any, '김', true);

      const errors = await validate(dto);

      const firstNameError = errors.find((e) => e.property === 'firstName');
      expect(firstNameError).toBeDefined();
    });

    it('firstName이 빈 문자열이면 유효하지 않다', async () => {
      const dto = UserUpdateRequestDto.of('', '김', true);

      const errors = await validate(dto);

      const firstNameError = errors.find((e) => e.property === 'firstName');
      expect(firstNameError).toBeDefined();
    });

    it('firstName이 문자열이 아니면 유효하지 않다', async () => {
      const dto = UserUpdateRequestDto.of(123 as any, '김', true);

      const errors = await validate(dto);

      const firstNameError = errors.find((e) => e.property === 'firstName');
      expect(firstNameError).toBeDefined();
    });

    it('firstName이 51자 이상이면 유효하지 않다', async () => {
      const longName = '이'.repeat(51);
      const dto = UserUpdateRequestDto.of(longName, '김', true);

      const errors = await validate(dto);

      const firstNameError = errors.find((e) => e.property === 'firstName');
      expect(firstNameError).toBeDefined();
    });
  });

  describe('lastName 유효성 검사', () => {
    it('lastName이 없으면 유효하지 않다', async () => {
      const dto = UserUpdateRequestDto.of('재혁', undefined as any, true);

      const errors = await validate(dto);

      const lastNameError = errors.find((e) => e.property === 'lastName');
      expect(lastNameError).toBeDefined();
    });

    it('lastName이 빈 문자열이면 유효하지 않다', async () => {
      const dto = UserUpdateRequestDto.of('재혁', '', true);

      const errors = await validate(dto);

      const lastNameError = errors.find((e) => e.property === 'lastName');
      expect(lastNameError).toBeDefined();
    });

    it('lastName이 문자열이 아니면 유효하지 않다', async () => {
      const dto = UserUpdateRequestDto.of('재혁', 123 as any, true);

      const errors = await validate(dto);

      const lastNameError = errors.find((e) => e.property === 'lastName');
      expect(lastNameError).toBeDefined();
    });

    it('lastName이 51자 이상이면 유효하지 않다', async () => {
      const longName = '김'.repeat(51);
      const dto = UserUpdateRequestDto.of('재혁', longName, true);

      const errors = await validate(dto);

      const lastNameError = errors.find((e) => e.property === 'lastName');
      expect(lastNameError).toBeDefined();
    });
  });

  describe('isActive 유효성 검사', () => {
    it('isActive가 없으면 유효하지 않다', async () => {
      const dto = UserUpdateRequestDto.of('재혁', '김', undefined as any);

      const errors = await validate(dto);

      const isActiveError = errors.find((e) => e.property === 'isActive');
      expect(isActiveError).toBeDefined();
    });

    it('isActive가 boolean이 아니면 유효하지 않다', async () => {
      const dto = UserUpdateRequestDto.of('재혁', '김', 'true' as any);

      const errors = await validate(dto);

      const isActiveError = errors.find((e) => e.property === 'isActive');
      expect(isActiveError).toBeDefined();
    });
  });

  it('모든 필드가 유효하면 에러가 없다', async () => {
    const dto = UserUpdateRequestDto.of('재혁', '김', true);

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });
});
