import { Injectable } from '@nestjs/common';
import { Repository, DataSource, In } from 'typeorm';
import { Product } from '../domain/product.entity';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private readonly dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  /**
   * 상품 번호 목록에 해당하는 모든 상품을 조회한다.
   *
   * @param {string[]} productNumbers - 상품 번호 목록
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
