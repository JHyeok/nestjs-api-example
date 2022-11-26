import { isEmpty } from '../../../src/util/shared.util';

describe('SharedUtil', () => {
  describe('isEmpty', () => {
    it('obj가 undefined이거나 null인 경우 true를 반환한다', () => {
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty(null)).toBe(true);
    });

    it('obj가 undefined이거나 null이 아닌 경우 false를 반환한다', () => {
      expect(isEmpty('3')).toBe(false);
    });

    it('배열이 비어 있거나 존재하지 않으면 true를 반환한다', () => {
      expect(isEmpty([])).toBe(true);
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });

    it('배열이 비어 있지 않으면 false를 반환한다', () => {
      expect(isEmpty([1, 2])).toBe(false);
    });
  });
});
