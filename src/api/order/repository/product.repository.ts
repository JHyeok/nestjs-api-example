import { Repository, In } from 'typeorm';
import { Product } from '../domain/product.entity';
import { CustomRepository } from '../../../decorator/typeorm-ex.decorator';

@CustomRepository(Product)
export class ProductRepository extends Repository<Product> {
  /**
   * 상품 번호 목록에 해당하는 모든 상품을 조회한다.
   * @async
   *
   * @param {string[]} productNumbers - 상품 번호 목록
   *
   * @returns {Promise<Product[]>}
   */
  async findAllByProductNumberIn(productNumbers: string[]): Promise<Product[]> {
    return await this.find({
      where: {
        productNumber: In(productNumbers),
      },
    });
  }
}
